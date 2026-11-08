/**
 * Utility functions for Belarusian phone number formatting and strict validation
 */

export function formatBelarusPhone(input: string): string {
  // Strip non-digits
  let digits = input.replace(/\D/g, '');

  // If user entered starting with 80 (domestic prefix e.g. 8029...), convert to 37529...
  if (digits.startsWith('80') && digits.length >= 4) {
    digits = '375' + digits.slice(2);
  } else if (digits.startsWith('8') && !digits.startsWith('80') && digits.length > 1) {
    digits = '375' + digits.slice(1);
  } else if (!digits.startsWith('375') && digits.length > 0) {
    // If user starts typing without country code, prefix with 375
    if (digits.startsWith('29') || digits.startsWith('44') || digits.startsWith('33') || digits.startsWith('25') || digits.startsWith('17')) {
      digits = '375' + digits;
    }
  }

  // Cap at 12 digits (375 + 9 digits)
  digits = digits.slice(0, 12);

  // Format into +375 (XX) XXX-XX-XX
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `+${digits}`;
  if (digits.length <= 5) return `+${digits.slice(0, 3)} (${digits.slice(3)}`;
  if (digits.length <= 8) return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5)}`;
  if (digits.length <= 10) return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8)}`;
  return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
}

export function validateBelarusPhone(phone: string): { isValid: boolean; error: string | null } {
  const digits = phone.replace(/\D/g, '');

  if (!digits) {
    return { isValid: false, error: 'Укажите контактный номер телефона' };
  }

  // Check country code
  if (!digits.startsWith('375')) {
    // If international number (+7, etc.)
    if (digits.length >= 11) {
      return { isValid: true, error: null };
    }
    return { isValid: false, error: 'Номер должен начинаться с кода Беларуси +375' };
  }

  // Check length
  if (digits.length < 12) {
    return { isValid: false, error: `Введите полный номер: ещё ${12 - digits.length} цифр(ы)` };
  }

  // Check operator code
  const operatorCode = digits.slice(3, 5);
  const validCodes = ['25', '29', '33', '44', '17', '16', '21', '22', '23'];
  if (!validCodes.includes(operatorCode)) {
    return {
      isValid: false,
      error: `Неверный код оператора (${operatorCode}). Допустимые: (29, 44, 33, 25, 17)`,
    };
  }

  return { isValid: true, error: null };
}
