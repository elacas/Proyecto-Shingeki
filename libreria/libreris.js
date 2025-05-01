
<script src="https://unpkg.com/compromise"></script>
<script>
  // Definir algunas respuestas y reglas para los personajes
  const erenResponses = {
    question: ["No tengo tiempo para preguntas, tengo que avanzar.", "¿Tiene eso importancia para nuestra misión?"],
    greeting: ["Tatakae.", "Hmm, hola."],
    titan: ["Tenemos que eliminar a todos los titanes.", "Nunca descansaré hasta destruir al último de ellos."],
    // más categorías...
  };
  
  function getErenResponse(message) {
    const doc = nlp(message);
    
    if (doc.questions().found) {
      return erenResponses.question[Math.floor(Math.random() * erenResponses.question.length)];
    }
    
    if (doc.has('hola') || doc.has('saludos')) {
      return erenResponses.greeting[Math.floor(Math.random() * erenResponses.greeting.length)];
    }
    
    if (doc.has('titan') || doc.has('titanes')) {
      return erenResponses.titan[Math.floor(Math.random() * erenResponses.titan.length)];
    }
    
    // Respuesta por defecto
    return "Avanzaré, sin importar qué.";
  }
  
  // Configura tu UI para usar esta función
</script>
