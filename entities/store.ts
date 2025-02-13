import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ITranslationStore {
    lang: string[];
    lastLangs: string[];
    history: string[];
    addHistory: (lastword: string) => void;
    setLang: (langs: string[]) => void;
    setLastLangs: (langs: string[]) => void;
    clearHistory: () => void;
}

const useTranslationStore = create<ITranslationStore>()(
    persist(
        (set) => ({
            lang: [],
            lastLangs: ["en", "ru"],
            history: [],
            setLang: (langs) => set((state) => ({...state, lang: langs})),
            setLastLangs: (langs) => set((state) => ({...state, lastLangs: langs})),
            addHistory: (lastWord) => set((state) => {
                if(state.history.length < 4)
                {
                    return {...state, history: [...state.history, lastWord]};
                } else {
                    return {...state, history: [...state.history.slice(1), lastWord]}
                }
            }),
            clearHistory: () => set((state) => ({...state, history: []}))
        }),
        {
            name: "Langs",
        }
    )
)