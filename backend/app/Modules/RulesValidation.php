<?php

namespace App\Modules;

class RulesValidation
{

    public static function getRules() {
        return [
            'country_id' => 'required',
            'address' => 'required|max:180',
            'cellphone' => 'numeric|digits_between:10,10',
            'category_id' => 'required|exists:categories,id',
            'names' => 'required|min:5|max:100',
            'last_names' => 'required|min:5|max:100',
        ];
    }
    public static function getMessages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'email.unique' => 'El email ya existe en la base de datos.',
            'document_number.unique' => 'La cédula ya existe en la base de datos.',
            'email' => 'El formato del email es incorrecto.',
            'exists' => 'La categoría no existe en la tabla maestra.',
            'digits_between' => 'El número de celular debe contener 10 digitos.',
            'cellphone.numeric' => 'El número de teléfono solo puede tener números.',
            'min'   => 'El campo :attribute debe ser de al menos :min caracteres',
            'max'   => 'El campo :attribute debe tener máximo :max caracteres'
        ];
    }
}
