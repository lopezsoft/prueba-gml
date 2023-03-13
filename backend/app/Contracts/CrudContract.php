<?php

namespace App\Contracts;

use Illuminate\Http\Request;

interface CrudContract
{
    public function create(Request $request);
    public function read(Request $request);
    public function update(Request $request, $id);
    public function delete(Request $request, $id);
}
