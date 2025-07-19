
import { spawnSync } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  const {
    query: { id }
  } = req;

  if (!id) {
    return res.status(400).json({ error: 'Missing guest ID' });
  }

  const scriptPath = path.resolve(process.cwd(), '../../ai/face_matcher.py');
  const result = spawnSync('python3', [scriptPath, id]);

  if (result.error) {
    console.error('Python Error:', result.error);
    return res.status(500).json({ error: 'Python execution failed' });
  }

  try {
    const output = result.stdout.toString().trim();
    const matchedImages = JSON.parse(output);
    return res.status(200).json({ images: matchedImages });
  } catch (e) {
    console.error('Parse Error:', e);
    return res.status(500).json({ error: 'Invalid matcher output' });
  }
}
