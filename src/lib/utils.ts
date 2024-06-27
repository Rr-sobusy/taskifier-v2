import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAndLimitString(encodedString: string) {
  // Decode the URL-encoded string
  let decodedString = decodeURIComponent(encodedString);

  // Check if the decoded string exceeds 15 characters
  if (decodedString.length > 17) {
    // Trim the string to 15 characters and add a dot
    return decodedString.substring(0, 15) + "...";
  }

  // Return the original string if it's 15 characters or less
  return decodedString;
}
