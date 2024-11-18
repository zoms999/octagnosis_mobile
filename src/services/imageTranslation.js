import axios from 'axios';

const AZURE_ENDPOINT = process.env.VITE_AZURE_VISION_ENDPOINT;
const AZURE_KEY = process.env.VITE_AZURE_VISION_KEY;
const AZURE_TRANSLATE_ENDPOINT = process.env.VITE_AZURE_TRANSLATE_ENDPOINT;
const AZURE_TRANSLATE_KEY = process.env.VITE_AZURE_TRANSLATE_KEY;

export const imageTranslationService = {
	// 이미지에서 텍스트 추출
	async extractText(imageUrl) {
		try {
			const response = await axios.post(
				`${AZURE_ENDPOINT}/vision/v3.2/ocr`,
				{ url: imageUrl },
				{
					headers: {
						'Content-Type': 'application/json',
						'Ocp-Apim-Subscription-Key': AZURE_KEY,
					},
					params: {
						language: 'ko',
						detectOrientation: true,
					},
				},
			);

			// OCR 결과에서 텍스트 추출
			let extractedText = '';
			const regions = response.data.regions || [];
			regions.forEach(region => {
				region.lines.forEach(line => {
					line.words.forEach(word => {
						extractedText += word.text + ' ';
					});
					extractedText += '\n';
				});
			});

			return extractedText.trim();
		} catch (error) {
			console.error('Text extraction error:', error);
			throw error;
		}
	},

	// 텍스트 번역
	async translateText(text, targetLanguage) {
		try {
			const response = await axios.post(
				`${AZURE_TRANSLATE_ENDPOINT}/translate`,
				[{ text }],
				{
					headers: {
						'Ocp-Apim-Subscription-Key': AZURE_TRANSLATE_KEY,
						'Content-Type': 'application/json',
					},
					params: {
						'api-version': '3.0',
						from: 'ko',
						to: targetLanguage,
					},
				},
			);

			return response.data[0].translations[0].text;
		} catch (error) {
			console.error('Translation error:', error);
			throw error;
		}
	},
};
