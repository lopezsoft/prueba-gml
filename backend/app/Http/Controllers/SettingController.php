<?php

namespace App\Http\Controllers;

use App\Modules\SettingModule;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function getAll(): \Illuminate\Http\JsonResponse
    {
        return SettingModule::getAll();
    }

    public function getByTag($tag): \Illuminate\Http\JsonResponse
    {
        return SettingModule::getByTag($tag);
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        return SettingModule::update($request, $id);
    }
}
