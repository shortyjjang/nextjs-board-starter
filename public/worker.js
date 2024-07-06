// worker.ts
onmessage = async function (e) {
    const request = await sendData(e.data)
    postMessage(request);
};

async function sendData(post) {
    const request = await fetch("/api/v1/post/create", {
        method: "POST",
        body: JSON.stringify(post),
    }).then((response) => response.json())
    if (request.status === 200) {
        return 'success'
    }
    return 'failed'
}