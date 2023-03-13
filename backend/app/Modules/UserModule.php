<?php

namespace App\Modules;
use App\Contracts\CrudContract;
use App\Mail\ReportUsers;
use App\Models\Setting;
use App\Models\User;
use App\Notifications\UserCreate;
use App\Traits\MessagesTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UserModule implements CrudContract
{
    use MessagesTrait;

    /**
     * @throws \Exception
     */
    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $messages   = RulesValidation::getMessages();
            $localRules = [
                'document_number' => 'required|unique:users|max:20',
                'email' => 'required|unique:users|max:150|email:rfc,dns'
            ];
            $rules      = array_merge($localRules, RulesValidation::getRules());

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return self::getResponse500([
                    'messages' => $validator->errors(),
                ]);
            }
            $countryValidation  = CountryModules::getCountryById($request->country_id);
            if(count($countryValidation) == 0) {
                return self::getResponse500([
                    'messages' => (object) [
                        'country_id' => ['El País no existe en la tabla maestra.']
                    ]
                ]);
            }
            $user   = User::create($request->all());
            $user->notify(new UserCreate());
            // Send mail to administrator
            SendReportUsers::send();

            return self::getResponse200([
                'data'  => $user
            ]);
        }catch (\Exception $e) {
            return self::getResponse400([
                'message'   => $e->getMessage(),
            ]);
        }
    }

    public function read(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $query  = User::query();
            $search = $request->input('query');
            $uuid   = $request->input('uuid');
            if ($uuid) {
                $query->where('id', $uuid);
            }else if ($search) {
                $query->where(function ($row) use ($search) {
                   $row->where('names', 'like', "%{$search}%");
                   $row->orWhere('last_names', 'like', "%{$search}%");
                   $row->orWhere('document_number', 'like', "%{$search}%");
                   $row->orWhere('email', 'like', "%{$search}%");
                });
            }
            return self::getResponse200([
                'dataRecords' => $query->paginate()
            ]);
        }catch (\Exception $e) {
            return self::getResponse400([
                'message'   => $e->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        try {
            $user       = User::find($id);
            if(!$user) {
                return self::getResponse404();
            }

            $messages   = RulesValidation::getMessages();
            $localRules = RulesValidation::getRules();
            if($user->document_number !== $request->document_number) {
                $localRules = array_merge($localRules, [ 'document_number' => 'required|unique:users|max:20']);
            }

            if($user->email !== $request->email) {
                $localRules = array_merge($localRules, ['email' => 'required|unique:users|max:150|email:rfc,dns']);
            }
            $validator = Validator::make($request->all(), $localRules, $messages);

            if ($validator->fails()) {
                return self::getResponse500([
                    'messages' => $validator->errors(),
                ]);
            }
            $countryValidation  = CountryModules::getCountryById($request->country_id);
            if(count($countryValidation) == 0) {
                return self::getResponse500([
                    'messages' => (object) [
                        'country_id' => ['El País no existe en la tabla maestra.']
                    ]
                ]);
            }
            $user   = User::where('id', $user->id)
                        ->update($request->all());
            return self::getResponse200([
                'data'  => $user
            ]);
        }catch (\Exception $e) {
            return self::getResponse400([
                'message'   => $e->getMessage(),
            ]);
        }
    }

    public function delete(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        try {
            $user       = User::find($id);
            if(!$user) {
                return self::getResponse404();
            }
            $user->delete();
            $user->save();
            return self::getResponse200([
                'data'  => $user
            ]);
        }catch (\Exception $e) {
            return self::getResponse400([
                'message'   => $e->getMessage(),
            ]);
        }
    }
}
