import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

@Injectable({ providedIn: 'root' })
export class GenAIService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
      console.error('API_KEY is not defined. GenAI services will not function.');
      // In a real app, you might want to handle this more gracefully
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateDesignConcept(prompt: string): Promise<{ description: string; imageUrl: string }> {
    try {
      // Parallel requests for text and image generation
      const [textResponsePromise, imageResponsePromise] = [
        this.generateText(prompt),
        this.generateImage(prompt)
      ];

      const textResponse = await textResponsePromise;
      const imageResponse = await imageResponsePromise;
      
      const description = textResponse.text;
      const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

      return { description, imageUrl };

    } catch (error) {
      console.error("Error generating design concept:", error);
      throw new Error("Failed to generate design concept. Please try again.");
    }
  }

  private generateText(prompt: string): Promise<GenerateContentResponse> {
    const systemInstruction = `You are Sarah, an expert AI 3D design assistant for a company called XUSTOM 3D. A user has an idea for a 3D model. Your task is to take their idea and flesh it out into a rich, creative, and detailed description. This description will be used by 3D artists to create the model. Be imaginative, professional, and inspiring. Break down the concept into key visual and structural elements. Importantly, you should also suggest suitable 3D printing materials (like PLA for general use, ABS for durability, or Resin for high detail) and propose potential color schemes or finishes (such as matte, gloss, metallic, or multi-color).`;
    
    return this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });
  }

  private generateImage(prompt: string) {
    const imagePrompt = `Concept art for a 3D model based on the following idea: "${prompt}". Cinematic lighting, hyper-detailed, 8k, epic, photorealistic render.`;
    return this.ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: imagePrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });
  }

  async findNearbyPrintingHubs(location: string): Promise<{ text: string, sources: any[] }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Find the top 3D printing services near ${location}. Provide their name, a brief description, and if possible, their address.`,
        config: {
          tools: [{googleSearch: {}}],
        },
      });

      const groundingMetadata = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      return {
          text: response.text,
          sources: groundingMetadata
      };
    } catch (error) {
      console.error("Error with Google Search grounding:", error);
      throw new Error("Failed to find nearby hubs. The service may be unavailable.");
    }
  }

  async generateOrderStatusUpdate(productName: string, currentStatus: string): Promise<string> {
    try {
        const prompt = `You are Sarah, the friendly and enthusiastic AI assistant for XUSTOM 3D. A customer's order for a "${productName}" is currently at the "${currentStatus}" stage. Write a short (1-2 sentences), creative, and exciting status update for them. Make it sound like a special process is happening.`;
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              temperature: 0.9,
              thinkingConfig: { thinkingBudget: 0 } // For fast, creative response
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating status update:", error);
        return "Your order is being processed with care.";
    }
  }

  async generateProductDescription(productName: string, shortDescription: string): Promise<string> {
    try {
        const prompt = `You are a creative marketing expert for XUSTOM 3D, a cutting-edge 3D printing company.
        A customer is viewing a product named "${productName}".
        The product's brief description is: "${shortDescription}".

        Your task is to write a compelling, detailed, and engaging product description (around 3-4 paragraphs) that will be displayed on the product detail page.
        Highlight its unique design, potential uses, the quality of the 3D printing process, and why it's a must-have item.
        Use an enthusiastic and professional tone. Do not use markdown.`;

        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              temperature: 0.7,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating product description:", error);
        // Return a default descriptive text on error
        return "Discover the unique design and exceptional quality of this 3D printed creation. Perfect for adding a modern touch to your space, this item is crafted with precision and care to bring innovative ideas to life.";
    }
  }
}