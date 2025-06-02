/**
 * Validates a text input in Japanese format and converts it to a data object.
 * @param input - The text input to validate.
 * @returns The validated and converted data object, or throws an error if validation fails.
 */
export function validateAndConvertJapaneseInput(input: string): { date: Date; name: string } {
  // Regular expression to match Japanese date format (e.g., YYYY/MM/DD)
  const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

  // Split the input into parts (assuming "date,name" format)
  const parts = input.split(',');

  if (parts.length !== 2) {
    throw new Error('Invalid input format. Expected "date,name".');
  }

  const [dateStr, name] = parts;

  // Validate date format
  if (!dateRegex.test(dateStr)) {
    throw new Error('Invalid date format. Expected "YYYY/MM/DD".');
  }

  // Convert date string to Date object
  const date = new Date(dateStr.replace(/\//g, '-')); // Replace '/' with '-' for Date parsing

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date value.');
  }

  // Validate name (ensure it's not empty and contains valid characters)
  if (!name || name.trim().length === 0) {
    throw new Error('Invalid name. Name cannot be empty.');
  }

  // Return the validated and converted data object
  return { date, name: name.trim() };
}

// function that validates the format of a GUID string
export function isValidGuid(guid: string): boolean {
  const guidRegex = /^[{(]?[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}[)}]?$/i;
  return guidRegex.test(guid);
}


// function that validates the format of a IPV6 address string
export function isValidIPv6(ipv6: string): boolean {
  const ipv6Regex = /^(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}|(?:[0-9a-f]{1,4}:){1,7}:|(?:[0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}|(?:[0-9a-f]{1,4}:){1,5}(?::[0-9a-f]{1,4}){1,2}|(?:[0-9a-f]{1,4}:){1,4}(?::[0-9a-f]{1,4}){1,3}|(?:[0-9a-f]{1,4}:){1,3}(?::[0-9a-f]{1,4}){1,4}|(?:[0-9a-f]{1,4}:){1,2}(?::[0-9a-f]{1,4}){1,5}|[0-9a-f]{1,4}:(?::[0-9a-f]{1,4}){1,6}|:(?::[0-9a-f]{1,4}){1,7}|:$/i;
  return ipv6Regex.test(ipv6);
}
