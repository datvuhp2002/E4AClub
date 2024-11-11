interface Field {
  code: string;
  value: string | boolean | null;
}

interface FormValues {
  fields: Field[];
}

function SetFormValues(data: any): FormValues | null {
  const oForm: FormValues = { fields: [] };

  for (const [key, value] of Object.entries(data)) {
    // Ensure value is string, boolean, or null
    const sanitizedValue: string | boolean | null =
      typeof value === "string" || typeof value === "boolean" ? value : null;

    // Only add to the fields if the value is not null or an empty string
    if (sanitizedValue !== null && sanitizedValue !== "") {
      oForm.fields.push({
        code: key,
        value: sanitizedValue,
      });
    }
  }

  return oForm;
}
function GetFormValues(data: Record<string, any>): FormValues | null {
  const oForm: FormValues = { fields: [] };

  for (const [key, value] of Object.entries(data)) {
    oForm.fields.push({
      code: key,
      value: value ?? null,
    });
  }

  return oForm;
}

export { SetFormValues, GetFormValues };
