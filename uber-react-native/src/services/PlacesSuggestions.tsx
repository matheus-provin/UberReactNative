import axios, { AxiosResponse } from "axios";

type PlacePrediction = {
  description: string;
};

export const fetchSuggestions = async (
  text: string,
  setSuggestions: (arg0: string[]) => void
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=keyHere`
    );

    if (response.data.predictions) {
      const suggestions: string[] = response.data.predictions.map(
        (prediction: PlacePrediction) => prediction.description
      );
      setSuggestions(suggestions);
    }
  } catch (error) {
    console.error(error);
  }
};
