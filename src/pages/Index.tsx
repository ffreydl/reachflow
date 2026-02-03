import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import TopBar from "@/components/TopBar";
import ImageGrid from "@/components/ImageGrid";
import FloatingPromptBar from "@/components/FloatingPromptBar";
import RightSidebar from "@/components/RightSidebar";
import MobileSidebar from "@/components/MobileSidebar";

const IMAGE_API_BASE =
  "http://10.127.168.26:5678/webhook/68ff807a-568d-49cc-8398-cccb98e6b5a1/image/";

const isLikelyImageUrl = (value: unknown): value is string =>
  typeof value === "string" && /^https?:\/\//i.test(value);

const extractImageUrl = (data: unknown): string | null => {
  if (typeof data !== "object" || data === null) {
    return null;
  }

  const record = data as Record<string, unknown>;
  const urlValue = record.url;
  if (isLikelyImageUrl(urlValue)) {
    return urlValue;
  }

  const linkValue = record.link;
  return isLikelyImageUrl(linkValue) ? linkValue : null;
};

const Index = () => {
  const [selectedObjective, setSelectedObjective] = useState("conversion");
  const [selectedAngle, setSelectedAngle] = useState("social-proof");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [images, setImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (prompt: string) => {
    console.log("Generating ad creative:", prompt, {
      objective: selectedObjective,
      angle: selectedAngle,
      ratio: selectedRatio,
    });

    setIsGenerating(true);
    setImages([]); // Clear current images

    try {
      const response = await fetch(
        `${IMAGE_API_BASE}/${encodeURIComponent(prompt)}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as unknown;
      const imageUrl = extractImageUrl(data);

      if (!imageUrl) {
        throw new Error("API response did not include a url or link field.");
      }

      setImages([imageUrl]);
    } catch (error) {
      console.error("Image generation failed:", error);
      setImages([]);
      toast.error("Bild konnte nicht generiert werden", {
        description: "Bitte versuche es gleich erneut.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <TopBar />

      {/* Main content area */}
      <main className="flex-1 pt-20 pb-8 px-4 lg:px-6">
        <div className="max-w-6xl mx-auto flex gap-6">
          {/* Center main area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Image grid results */}
            <div className="flex-1 mb-6">
              <ImageGrid images={images} isLoading={isGenerating} />
            </div>

            {/* Mobile sidebar (accordion) */}
            <MobileSidebar
              selectedObjective={selectedObjective}
              onObjectiveSelect={setSelectedObjective}
              selectedAngle={selectedAngle}
              onAngleSelect={setSelectedAngle}
              selectedRatio={selectedRatio}
              onRatioSelect={setSelectedRatio}
            />

            {/* Floating prompt bar */}
            <div className="mt-6">
              <FloatingPromptBar 
                onGenerate={handleGenerate} 
                isGenerating={isGenerating}
              />
            </div>
          </div>

          {/* Right sidebar (desktop) */}
          <RightSidebar
            selectedObjective={selectedObjective}
            onObjectiveSelect={setSelectedObjective}
            selectedAngle={selectedAngle}
            onAngleSelect={setSelectedAngle}
            selectedRatio={selectedRatio}
            onRatioSelect={setSelectedRatio}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
