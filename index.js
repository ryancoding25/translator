import OpenAI from "openai";

const ctaEl = document.getElementById("cta");

const openai = new OpenAI({
  apiKey: `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`,
   


})


let isStart = true;

ctaEl.addEventListener('click', () => {
    if (isStart) {
       translate();
    } else {
        toggleUI();
    }
});

async function translate() {
    let selectedLanguage = null;
    const radios = document.getElementsByName('language');
    for (let radio of radios) {
        if (radio.checked) {
            selectedLanguage = radio.value;
            break;
        }
    }

    if (selectedLanguage) {
        const translation = await request(selectedLanguage);
        console.log('3', translation)
        document.getElementById('output').textContent = translation;
        toggleUI();
    }

}

function toggleUI() {
    isStart = !isStart;
    ctaEl.textContent = isStart ? 'Translate' : 'Start Over';
    document.getElementById('radios').classList.toggle('hide');
    const output = document.getElementById('output')
    output.classList.toggle('hide');
    if (isStart) {
        output.textContent = '';
    }

}

async function request(language) {
    const openai = new OpenAI({
 apiKey: `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`,


    });

    const input = document.getElementById('input').value

    const messages = [
        {
            "role": "system",
            "content": `you are an expert translator at pollglot level and you can speak european spanish at native level and use phrases that native speakers of european spanish would use, you will translate text from english to the chosen language below but you are amazing at spanish . In response only return the translation. There is an example included between ###.`
        },
        {
            "role": "user",
            "content": `${input} to ${language} ### How are you? Cómo estás?`
        }
    ]

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages
    });

   return response.choices[0].message.content
}
