import { useState } from 'react';
import { useGameStore } from '../store';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Loader2 } from 'lucide-react';

export default function AvatarEvolution({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { level, stats, setAvatarUrl } = useGameStore();
  const [isEvolving, setIsEvolving] = useState(false);
  const [error, setError] = useState('');

  const evolveAvatar = async () => {
    setIsEvolving(true);
    setError('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `A cute, high-quality, 3D isometric RPG character avatar. 
      The character is level ${level}. 
      They have the following stats: 
      Fitness: ${stats.fitness}, 
      Reading: ${stats.reading}, 
      Travel: ${stats.travel}, 
      Cooking: ${stats.cooking}, 
      Mental Health: ${stats.mentalHealth}.
      Make them look like an adventurer who is improving their life. 
      If fitness is high, maybe they have athletic gear. 
      If reading is high, maybe they hold a book or wear glasses. 
      If cooking is high, maybe they have a chef's hat or apron. 
      The style should be cute, vibrant, and similar to Animal Crossing or a cozy indie game. 
      Clean background.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "512px"
          }
        }
      });

      let newAvatarUrl = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          newAvatarUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (newAvatarUrl) {
        setAvatarUrl(newAvatarUrl);
        onClose();
      } else {
        setError('Failed to generate avatar. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while evolving your avatar.');
    } finally {
      setIsEvolving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-purple-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Evolve Avatar</h2>
              <p className="text-gray-500 text-sm mt-2">
                Use AI to generate a new avatar based on your current stats and level!
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 text-center">
                {error}
              </div>
            )}

            <button
              onClick={evolveAvatar}
              disabled={isEvolving}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isEvolving ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Evolving...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Evolve Now
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
