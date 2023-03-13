<?php

namespace App\Traits;

/**
 * Messages Trait
 */
trait MessagesTrait
{
    static function getResponse200($data = []): \Illuminate\Http\JsonResponse
    {
        $data['success']    = true;
        return response()->json($data);
    }

    static function getResponse201($data = []): \Illuminate\Http\JsonResponse
    {
        $data['success']    = true;
        $data['message']    = 'Recurso creado exitosamente.';
        return response()->json($data, 201);
    }

    /** 302 Found */
    static function getResponse302($data = []): \Illuminate\Http\JsonResponse
    {
        $data['success']    = true;
        return response()->json($data, 302);
    }

    /**
     * 400 Bad Request
     */
    static function getResponse400($data = []): \Illuminate\Http\JsonResponse
    {
        $data['success']    = false;
        return response()->json($data, 400);
    }

    /**
     * Unauthorized
     */
    static function getResponse401(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success'   => false,
            'message'   => 'Acceso No autorizado',
        ], 401);
    }

    /**
     * Not found
     */
    static function getResponse404(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success'   => false,
            'message'   => 'Not found',
        ], 401);
    }

    /**
     *
     */
    static function getResponse422(): \Illuminate\Http\JsonResponse
    {
        $data['success']    = false;
        return response()->json($data, 422);
    }

    public static function getResponse500($data  = []): \Illuminate\Http\JsonResponse
    {
        $data['success']    = false;
        return response()->json($data, 500);
    }

}
