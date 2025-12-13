// pages/api/generateFoodImage.js (FINAL - Free AI Generator)

export default async function handler(req, res) {
    const { foodName } = req.query;

    // Default fallback
    if (!foodName) {
        return res.status(200).json({ imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80" });
    }

    // Sanitize
    const cleanName = foodName.replace(/[^a-zA-Z0-9 ]/g, "");

    // Use Pollinations.ai (Free, High Quality, No Key)
    // We add 'random' seed based on name to ensure stability for same food, but variety across foods.
    const prompt = encodeURIComponent(`professional cinematic shot of delicious ${cleanName} indian food, steam rising, 8k resolution, dramatic lighting`);
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?nologo=true&seed=${cleanName.length}&width=800&height=600`;

    // Return immediately. The browser will load the image from the URL.
    res.status(200).json({ imageUrl });
}
