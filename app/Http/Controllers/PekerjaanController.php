<?php

namespace App\Http\Controllers;

use App\Models\Pekerjaan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PekerjaanController extends Controller
{

    public $columns = [
        ["name" => "ID", "uid" => "id", "sortable" => true],
        ["name" => "NAME", "uid" => "name", "sortable" => true],
        ["name" => "DESCRIPTION", "uid" => "description", "sortable" => true],

        ["name" => "ACTIONS", "uid" => "actions"],
    ];

    public $visibleColumns = ["name", "description", "actions"];




    public function  getAll()
    {
     
        $query =  Pekerjaan::where('name', 'LIKE', '%' . request('search') . '%')->latest()->paginate(10);

      
        
        $results =  $query;
        $responses =  [
            'data' => $results,
            'visibleColumns' => $this->visibleColumns,
            'columns' => $this->columns
        ];



        return Inertia::render('Master/Pekerjaan', $responses);
    }
}
