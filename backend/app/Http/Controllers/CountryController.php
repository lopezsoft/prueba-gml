<?php

namespace App\Http\Controllers;

use App\Modules\CountryModules;

class CountryController extends Controller
{
    /**
     * @throws \Exception
     */
    public function getCountryById($code): array
    {
        return CountryModules::getCountryById($code);
    }

    public function getCountries($region): \Illuminate\Http\JsonResponse
    {
        return CountryModules::getCountries($region);
    }
}
