export const APPLICATION_STATUSES = [

  "Vorbereitung",
  "Beworben",
  "Antwort erhalten",
  "Besichtigung",
  "Zusage",
  "Absage"

] as const;


export type ApplicationStatus =
  typeof APPLICATION_STATUSES[number];



