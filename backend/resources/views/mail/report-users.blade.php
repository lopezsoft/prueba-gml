<x-mail::message>
# Hola Administrator

Esta es la lista de usuarios registrados por País.

<x-mail::table>
    | País       | Total         |
    | ------------- |:-------------:|
    @foreach($data as $row)
    | {{ $row->country }}      | {{$row->total}} |
    @endforeach
</x-mail::table>
Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
