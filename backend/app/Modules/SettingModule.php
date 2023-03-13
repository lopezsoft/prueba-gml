<?php

namespace App\Modules;

use App\Models\Setting;
use App\Traits\MessagesTrait;
use Illuminate\Http\Request;

class SettingModule
{
    use MessagesTrait;
    public static function getByTag($tag): \Illuminate\Http\JsonResponse
    {
        $query  = Setting::query();
        $query->where('tag', $tag);

        return self::getResponse200([
            'setting' =>$query->first()
        ]);
    }
    public static function getAll(): \Illuminate\Http\JsonResponse
    {
        return self::getResponse200([
            'dataRecords' => Setting::query()->paginate()
        ]);
    }

    public static function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        Setting::where('id', $id)->update($request->all());
        return self::getResponse200();
    }
}
