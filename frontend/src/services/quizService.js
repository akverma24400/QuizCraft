import api from "./api";

export const uploadQuizFiles = async ({
  files,
  difficulty,
  questions,
  timer,
  duration,
}) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("difficulty", difficulty);
  formData.append("questions", questions);
  formData.append("timer", timer);
  formData.append("duration", duration);

  const response = await api.post("/quiz/upload", formData);

  return response.data;
};
