import axios, { AxiosError } from "axios"
import { IParameters } from "@/entities/langs.model";

const API_URL = "https://dictionary.yandex.net/api/v1/dicservice.json/"

const DictionaryAPIInstance = axios.create({baseURL: API_URL})

const API_HEADERS = {
    Apikey: "dict.1.1.20250123T072148Z.dd7b721c5d58a801.0dcc96ebfb15ab2a7203eee682caf71a2b0b79f6"
};

export interface IApiResponse<T> {
    data: T | null
    error: null | string
}

export interface IApiError {
    code: number
    message: string
}

const DictionaryAPI = {
    getLangs: async () => {
        try {
            const res = await DictionaryAPIInstance.get<string[]>(`getLangs`, {
                params: {
                    key: API_HEADERS.Apikey,
                }
            })
            return res.data
        } catch (error) {}
    },
    translateWord: async ({ word, firstLang, secondLang}: IParameters) => {
        try {
            const res = await DictionaryAPIInstance.get(
                `https://dictionary.yandex.net/api/v1/dicservice.json/lookup`,
                {
                    params: {
                        key: API_HEADERS.Apikey,
                        text: word,
                        lang: `${firstLang}-${secondLang}`,
                    },
                }
            );
            return {
                ...res,
                error: null
                
            }
        } catch (e) {
            const error = e as AxiosError<IApiError>
            console.error(error);
            console.log(error)

            return {
                data: null,
                error: error.response?.data.message || error.message
            }
        }
    },
}

export default DictionaryAPI;