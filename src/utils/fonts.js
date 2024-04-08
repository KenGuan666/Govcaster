export default async function getFontArrayBuffer(fontPath) {
    const fontURL = new URL(fontPath);
    const response = await fetch(fontURL);
    const data = await response.arrayBuffer();
    return data;
}

