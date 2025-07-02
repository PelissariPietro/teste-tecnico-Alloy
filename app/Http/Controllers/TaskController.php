<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Jobs\DeleteCompletedTask;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Cache::remember('tasks.index', 60, function () {
            return Task::whereNull('deleted_at')->get();
        });
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'finalizado' => 'boolean',
            'data_limite' => 'nullable|date',
        ]);
        info('Creating task with data: ' . json_encode($validated));

        $task = Task::create($validated);
        info('Task created: ' . json_encode($task));
        Cache::tags(['tasks'])->flush();

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        $cacheKey = 'tasks.show.' . $task->id;
        $task = Cache::tags(['tasks'])->remember($cacheKey, 60, function () use ($task) {
            return $task;
        });

        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'descricao' => 'nullable|string',
            'finalizado' => 'boolean',
            'data_limite' => 'nullable|date',
        ]);

        $task->update($validated);
        Cache::tags(['tasks'])->flush();

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        Cache::tags(['tasks'])->flush();

        return response()->json(['message' => 'Tarefa excluída (soft delete)']);
    }

    public function toggle(Task $task)
    {
        $task->finalizado = !$task->finalizado;
        $task->save();
        Cache::tags(['tasks'])->flush();

        if ($task->finalizado) {
            DeleteCompletedTask::dispatch($task)->delay(now()->addMinutes(10));
        }

        return response()->json($task);
    }
}
