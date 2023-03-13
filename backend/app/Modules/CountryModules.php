<?php

namespace App\Modules;
use App\Traits\MessagesTrait;
use Illuminate\Support\Facades\Http;
class CountryModules
{
    use MessagesTrait;

    public static function getCountryById($code) : array
    {
        try {
            $response   = Http::get("https://restcountries.com/v3.1/alpha/{$code}");
            if($response->failed()) {
                return [];
            }
            return $response->object();
        }catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
    public static function getCountries($region): \Illuminate\Http\JsonResponse
    {
        try {
            $response   = Http::get("https://restcountries.com/v3.1/region/{$region}");
            $countries  = $response->object();
            $countryData=[];

            if($countries) {
                foreach ($countries as $country) {
                    $countryData[]= (Object) [
                        'name'  => $country->name,
                        'ccn3'  => $country->ccn3,
                        'flags' => $country->flags,
                    ];
                }
            }
            return  self::getResponse200([
                'records'   => $countryData
            ]);
        } catch (\Exception $e) {
            return self::getResponse500([
                'error' => $e->getMessage()
            ]);
        }
    }
}
