<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix('v1')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::prefix('user')->group(function () {
            Route::post('/', 'create');
            Route::get('/', 'read');
            Route::get('/{id}', 'readById');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'delete');
            Route::post('/send-report', 'sendReport');
        });
    });

    Route::prefix('setting')->group(function () {
       Route::controller(SettingController::class)->group(function () {
          Route::get('/', 'getAll');
          Route::get('/{tag}', 'getByTag');
          Route::put('/{id}', 'update');
       });
    });

    Route::prefix('category')->group(function () {
       Route::controller(CategoryController::class)->group(function () {
          Route::get('/', 'getCategories');
       });
    });

    Route::prefix('countries')->group(function () {
       Route::controller(CountryController::class)->group(function () {
          Route::get('/region/{region}', 'getCountries');
          Route::get('/alpha/{code}', 'getCountryById');
       });
    });
});
