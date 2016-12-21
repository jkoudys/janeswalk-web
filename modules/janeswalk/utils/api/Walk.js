/**
 * Walk Utils
 *
 * Mapping functions to grab remote or global-defined Walks
 */

async function save(walk) {
  return await fetch(`/index.php?cID=${walk.id}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify(walk),
  }).then((res) => res.json());
}

async function publish(walk) {
  return await fetch(`/index.php?cID=${walk.id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify(walk),
  }).then((res) => res.json());
}

export { save, publish };
