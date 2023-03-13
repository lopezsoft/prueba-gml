<?php

namespace App\Http\Controllers;

use App\Contracts\CrudContract;
use App\Modules\SendReportUsers;
use App\Modules\UserModule;
use Illuminate\Http\Request;

class UserController extends Controller implements CrudContract
{
    //
    public function create(Request $request)
    {
        return (new UserModule())->create($request);
    }
    public function read(Request $request): \Illuminate\Http\JsonResponse
    {
        return (new UserModule())->read($request);
    }
    public function readById(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $request->uui   = $id;
        return (new UserModule())->read($request);
    }

    public function update(Request $request, $id)
    {
        return (new UserModule())->update($request, $id);
    }

    public function delete(Request $request, $id)
    {
        return (new UserModule())->delete($request, $id);
    }

    public function sendReport()
    {
        SendReportUsers::send();
    }

}
