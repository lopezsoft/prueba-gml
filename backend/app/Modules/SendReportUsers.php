<?php

namespace App\Modules;

use App\Mail\ReportUsers;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class SendReportUsers
{
    public static function send(): void
    {
        $query  = User::query()
                    ->selectRaw('COUNT(id) AS total, country_id')
                    ->groupBy('country_id')
                    ->get();
        $data   = [];
        foreach ($query as $row) {
            $countryValidation  = CountryModules::getCountryById($row->country_id);
            $data[] = (Object) [
                'total'     => $row->total,
                'country'   => $countryValidation[0]->name->common
            ];
        }
        // Send mail to administrator
        $setting  = Setting::where('tag', 'E001')->first();
        Mail::to($setting->value)->queue(new ReportUsers($data));
    }
}
