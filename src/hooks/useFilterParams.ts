import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useFilterParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL on first load
  const [focusedAxes, setFocusedAxes] = useState<string[]>(() => {
    const focusParam = searchParams.get("focus");
    return focusParam ? focusParam.split(",").filter(Boolean) : [];
  });

  const [focusedScenes, setFocusedScenes] = useState<string[]>(() => {
    const scenesParam = searchParams.get("scenes");
    return scenesParam ? scenesParam.split(",").filter(Boolean) : [];
  });

  const [focusedTags, setFocusedTags] = useState<string[]>(() => {
    const tagsParam = searchParams.get("tags");
    return tagsParam ? tagsParam.split(",").filter(Boolean) : [];
  });

  // Sync from URL changes (Back/Forward navigation)
  useEffect(() => {
    const focusParam = searchParams.get("focus");
    const axes = focusParam ? focusParam.split(",").filter(Boolean) : [];
    
    const sceneParam = searchParams.get("scenes");
    const scenes = sceneParam ? sceneParam.split(",").filter(Boolean) : [];

    const tagsParam = searchParams.get("tags");
    const tags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];

    setFocusedAxes(prev => 
      (prev.length === axes.length && prev.every(v => axes.includes(v))) ? prev : axes
    );
    setFocusedScenes(prev => 
      (prev.length === scenes.length && prev.every(v => scenes.includes(v))) ? prev : scenes
    );
    setFocusedTags(prev => 
      (prev.length === tags.length && prev.every(v => tags.includes(v))) ? prev : tags
    );
  }, [searchParams]);

  // Handler Generators
  const createToggleHandler = useCallback((
    currentItems: string[], 
    setItems: (items: string[]) => void, 
    paramKey: string
  ) => {
    return (itemId: string) => {
      let newItems: string[];
      if (currentItems.includes(itemId)) {
        newItems = currentItems.filter(id => id !== itemId);
      } else {
        newItems = [...currentItems, itemId];
      }
      
      setItems(newItems);

      // Sync to URL
      const params = new URLSearchParams(searchParams.toString());
      if (newItems.length > 0) {
        params.set(paramKey, newItems.join(","));
      } else {
        params.delete(paramKey);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    };
  }, [router, searchParams]);

  const handleAxisToggle = createToggleHandler(focusedAxes, setFocusedAxes, "focus");
  const handleSceneToggle = createToggleHandler(focusedScenes, setFocusedScenes, "scenes");
  const handleTagToggle = createToggleHandler(focusedTags, setFocusedTags, "tags");

  return {
    focusedAxes,
    focusedScenes,
    focusedTags,
    handleAxisToggle,
    handleSceneToggle,
    handleTagToggle
  };
}
