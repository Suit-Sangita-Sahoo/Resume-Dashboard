const extractTextFromPDF = async (file) => {
  try {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        try {
          const typedArray = new Uint8Array(fileReader.result);

          // ✅ FIX: use object format
          const loadingTask = pdfjsLib.getDocument({ data: typedArray });

          const pdf = await loadingTask.promise;

          let text = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            const strings = content.items.map((item) => item.str);
            text += strings.join(" ");
          }

          resolve(text);

        } catch (err) {
          console.error("PDF Read Error:", err);
          reject("Failed to read PDF");
        }
      };

      fileReader.onerror = () => reject("File reading error");

      fileReader.readAsArrayBuffer(file);
    });

  } catch (error) {
    console.error("Extraction Error:", error);
    return "";
  }
};