import { NextRequest, NextResponse } from "next/server";
import levenshtein from "fast-levenshtein";

export async function POST(req: NextRequest) {
  try {
    const { text1, text2 } = await req.json();
    if (!text1 || !text2) {
      return NextResponse.json(
        { error: "Missing text1 or text2" },
        { status: 400 }
      );
    }

    const words1 = text1.split(" ");
    const words2 = text2.split(" ");
    let highlightedWords: string[] = [];

    words1.forEach((word: any, index: any) => {
      const correctWord = words2[index] || "";
      const distance = levenshtein.get(word, correctWord);

      if (distance > 0) {
        // Đánh dấu từ sai bằng HTML (thêm span class "text-red-500")
        highlightedWords.push(`<span class="text-red-500">${word}</span>`);
      } else {
        highlightedWords.push(word);
      }
    });

    const highlightedText = highlightedWords.join(" ");
    const maxLen = Math.max(text1.length, text2.length);
    const similarity =
      ((maxLen - levenshtein.get(text1, text2)) / maxLen) * 100;

    return NextResponse.json({ similarity, highlightedText });
  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
