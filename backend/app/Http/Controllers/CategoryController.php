<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Traits\MessagesTrait;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use MessagesTrait;
    public function getCategories(): \Illuminate\Http\JsonResponse
    {
        return self::getResponse200([
           'records'    => Category::get()
        ]);
    }
}
