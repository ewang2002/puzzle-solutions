type Graph = { [course: number]: number[]; };

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    if (prerequisites.length === 0) {
        return true;
    }

    const nodesWithRelations = new Set<number>();

    const graph: Graph = {};
    for (const [to, from] of prerequisites) {
        if (!(from in graph)) {
            graph[from] = [];
        }

        nodesWithRelations.add(from);
        nodesWithRelations.add(to);
        graph[from].push(to);
    }

    if (hasCycle(graph)) {
        return false;
    }

    const topoRes = topologicalSort(graph);
    return topoRes.length === nodesWithRelations.size;
};

function hasCycle(graph: Graph): boolean {
    function dfs(node: number, visited: Set<number>, path: Set<number>): boolean {
        if (path.has(node)) {
            return true;
        }

        if (visited.has(node)) {
            return false;
        }

        path.add(node);
        visited.add(node);

        let res = false;
        if (node in graph) {
            for (const neighbor of graph[node]) {
                res ||= dfs(neighbor, visited, path);
            }
        }

        path.delete(node);
        return res;
    }

    const visited = new Set<number>();
    const path = new Set<number>();
    for (const node in graph) {
        if (dfs(Number.parseInt(node), visited, path)) {
            return true;
        }
    }

    return false;
}

function topologicalSort(graph: Graph): number[] {
    function dfs(node: number, stack: number[], visited: Set<number>) {
        visited.add(node);

        if (node in graph) {
            for (const neighbor of graph[node]) {
                if (visited.has(neighbor)) {
                    continue;
                }

                dfs(neighbor, stack, visited);
            }
        }

        stack.push(node);
    }

    const visited = new Set<number>();
    const res = [];
    for (const node in graph) {
        const nodeInt = Number.parseInt(node, 10);
        if (visited.has(nodeInt)) {
            continue;
        }

        dfs(nodeInt, res, visited);
    }

    return res.reverse();
}

console.log(canFinish(2, [[1, 0]]));
console.log(canFinish(8, [[1, 0], [3, 1], [4, 1], [7, 4], [2, 0], [6, 2], [5, 2], [4, 5]]));
console.log(canFinish(2, [[1, 0], [0, 1]]));
console.log(canFinish(5, [[1, 4], [2, 4], [3, 1], [3, 2]]));