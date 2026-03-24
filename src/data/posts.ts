export interface TextSection {
  type?: 'text'
  heading: string
  body: string
  table?: { label: string; value: string }[]
  tip?: string
  image?: string
  imageCaption?: string
}

export interface FabricSection {
  type: 'fabric'
  heading: string
  intro: string
  table: { label: string; value: string }[]
  tip: string
  image?: string
}

export type PostSection = TextSection | FabricSection

export interface Post {
  slug: string
  date: string
  readTime: number
  category: string
  image?: string
  translations: {
    pt: {
      title: string
      subtitle: string
      sections: PostSection[]
      conclusion: string
      cta: string
    }
    en: {
      title: string
      subtitle: string
      sections: PostSection[]
      conclusion: string
      cta: string
    }
    es: {
      title: string
      subtitle: string
      sections: PostSection[]
      conclusion: string
      cta: string
    }
  }
}

export const posts: Post[] = [
  {
    slug: 'the-new-language-of-luxury',
    date: '2025-03-18',
    readTime: 5,
    category: 'Luxo',
    image: '/images/blog/new-language-of-luxury-hero.png',
    translations: {
      en: {
        title: 'The New Language of Luxury',
        subtitle: 'True luxury was never loud. It was always precise.',
        sections: [
          {
            heading: 'Beyond the Golden Surface',
            body: 'For decades, luxury in interior design spoke in a single dialect: gilded frames, marble floors, crystal chandeliers. Opulence as evidence. The room announced its cost so the visitor would not need to ask.\n\nThat language is aging. The new luxury does not announce. It reveals — slowly, to those who know how to look. A single piece of furniture with the kind of craftsmanship that can only come from hands, not machines. A wall finish that changes color as the afternoon passes. A fabric that asks to be touched before it can be understood.',
          },
          {
            heading: 'The Material Knows',
            body: 'Real luxury lives in the quality of materials — not their price tags, but their honesty. Stone that was quarried, not poured. Wood that was grown, not engineered. Leather that will soften over years, not crack.\n\nThese materials share a common quality: they improve with time. They carry the memory of use. In a world of disposable objects, a material that grows more beautiful as it ages is, in itself, an act of radicalism. That is luxury.',
            table: [
              { label: 'Stone', value: 'Quarried, not poured — each vein is unique and tells time' },
              { label: 'Wood', value: 'Grown, not engineered — gains color and character over the years' },
              { label: 'Natural leather', value: 'Softens and builds memory with use — improves over time' },
              { label: 'Linen & wool', value: 'Fabrics that breathe — tactile honesty, beauty that needs no performance' },
            ],
            tip: 'A truly luxury material needs no treatment to look expensive — it already is. When evaluating a piece, run your hand across it: honest materials reveal themselves to the touch before any label does.',
          },
          {
            heading: 'Space as the Ultimate Privilege',
            body: 'In dense cities where square meters are currency, space itself has become the most exclusive material of all. Not space as emptiness — but space as intention. A room with room to breathe. A corridor wide enough to walk slowly. A reading corner that asks nothing of you except your presence.\n\nThe luxury interior of this decade gives space back to its inhabitant. It does not fill every corner. It trusts silence. It designs for stillness as much as for use.',
          },
          {
            heading: 'Personalization Over Prestige',
            body: 'The shift that defines contemporary luxury most clearly is this: it has moved from status to identity. The question is no longer "what does this room say about my wealth?" but "what does this room say about who I am?"\n\nThis is harder to design. It requires listening. It requires understanding how a person moves through their home at seven in the morning, what they need from a room after a long day, what objects carry meaning for them. The most luxurious room is not the most expensive one. It is the one that fits its owner like a well-made suit.',
          },
        ],
        conclusion:
          'Luxury, properly understood, is not a style. It is a standard of attention — applied to materials, to space, to the human being who will live within it. When a room is designed at that level of care, it does not need to declare itself. The person who enters simply knows.',
        cta: 'Carol Orofino Design brings this standard of attention to every project. If you are ready to invest in a space built around who you truly are, we invite you to begin.',
      },
      pt: {
        title: 'A Nova Linguagem do Luxo',
        subtitle: 'O verdadeiro luxo nunca foi barulhento. Sempre foi preciso.',
        sections: [
          {
            heading: 'Além da Superfície Dourada',
            body: 'Durante décadas, o luxo no design de interiores falou em um único dialeto: molduras douradas, pisos de mármore, lustres de cristal. A opulência como evidência. O ambiente anunciava seu custo para que o visitante não precisasse perguntar.\n\nEssa linguagem está envelhecendo. O novo luxo não anuncia. Ele revela — devagar, para quem sabe olhar. Uma única peça de mobiliário com o tipo de artesanato que só pode vir de mãos, não de máquinas. Um acabamento de parede que muda de cor conforme a tarde passa. Um tecido que pede para ser tocado antes de poder ser compreendido.',
          },
          {
            heading: 'O Material Sabe',
            body: 'O luxo real vive na qualidade dos materiais — não em suas etiquetas de preço, mas em sua honestidade. Pedra que foi extraída, não despejada. Madeira que foi cultivada, não engenheirada. Couro que vai amaciar com os anos, não rachar.\n\nEsses materiais compartilham uma qualidade comum: melhoram com o tempo. Carregam a memória do uso. Em um mundo de objetos descartáveis, um material que fica mais bonito conforme envelhece é, em si mesmo, um ato de radicalismo. Isso é luxo.',
            table: [
              { label: 'Pedra', value: 'Extraída, não despejada — cada veio é único e conta o tempo' },
              { label: 'Madeira', value: 'Cultivada, não engenheirada — ganha cor e caráter com os anos' },
              { label: 'Couro natural', value: 'Amolece e cria memória com o uso — melhora com o tempo' },
              { label: 'Linho e lã', value: 'Tecidos que respiram — honestidade tátil, beleza que não precisa se anunciar' },
            ],
            tip: 'Um material de luxo real não precisa de tratamento para parecer caro — ele já é. Ao avaliar uma peça, passe a mão: materiais honestos se revelam no toque antes de qualquer rótulo.',
          },
          {
            heading: 'O Espaço como Privilégio Máximo',
            body: 'Em cidades densas onde metros quadrados são moeda, o espaço em si tornou-se o material mais exclusivo de todos. Não o espaço como vazio — mas o espaço como intenção. Um ambiente com espaço para respirar. Um corredor largo o suficiente para se caminhar devagar. Um canto de leitura que não exige nada de você além de sua presença.\n\nO interior de luxo desta década devolve o espaço ao seu habitante. Não preenche cada canto. Confia no silêncio. Projeta para a quietude tanto quanto para o uso.',
          },
          {
            heading: 'Personalização Acima do Prestígio',
            body: 'A mudança que define o luxo contemporâneo com mais clareza é esta: ele passou do status para a identidade. A pergunta não é mais "o que este ambiente diz sobre minha riqueza?" mas "o que este ambiente diz sobre quem eu sou?"\n\nIsso é mais difícil de projetar. Exige escuta. Exige entender como uma pessoa se move pela casa às sete da manhã, o que ela precisa de um ambiente depois de um dia longo, quais objetos carregam significado para ela. O ambiente mais luxuoso não é o mais caro. É o que veste seu dono como um terno bem feito.',
          },
        ],
        conclusion:
          'Luxo, bem compreendido, não é um estilo. É um padrão de atenção — aplicado aos materiais, ao espaço, ao ser humano que vai viver dentro dele. Quando um ambiente é projetado nesse nível de cuidado, não precisa se declarar. A pessoa que entra simplesmente sabe.',
        cta: 'Carol Orofino Design traz esse padrão de atenção a cada projeto. Se você está pronto para investir em um espaço construído em torno de quem você realmente é, convidamos você a começar.',
      },
      es: {
        title: 'El Nuevo Lenguaje del Lujo',
        subtitle: 'El verdadero lujo nunca fue ruidoso. Siempre fue preciso.',
        sections: [
          {
            heading: 'Más Allá de la Superficie Dorada',
            body: 'Durante décadas, el lujo en el diseño de interiores habló en un único dialecto: marcos dorados, pisos de mármol, lámparas de cristal. La opulencia como evidencia. La habitación anunciaba su costo para que el visitante no necesitara preguntar.\n\nEse lenguaje está envejeciendo. El nuevo lujo no anuncia. Revela — despacio, para quienes saben mirar. Una única pieza de mobiliario con el tipo de artesanía que solo puede venir de manos, no de máquinas. Un acabado de pared que cambia de color al pasar la tarde. Una tela que pide ser tocada antes de poder ser comprendida.',
          },
          {
            heading: 'El Material Sabe',
            body: 'El lujo real vive en la calidad de los materiales — no en sus etiquetas de precio, sino en su honestidad. Piedra que fue extraída, no vertida. Madera que fue cultivada, no fabricada. Cuero que se suavizará con los años, no se agrietará.\n\nEstos materiales comparten una cualidad común: mejoran con el tiempo. Llevan la memoria del uso. En un mundo de objetos desechables, un material que se vuelve más hermoso al envejecer es, en sí mismo, un acto de radicalismo. Eso es lujo.',
            table: [
              { label: 'Piedra', value: 'Extraída, no vertida — cada veta es única y cuenta el tiempo' },
              { label: 'Madera', value: 'Cultivada, no fabricada — gana color y carácter con los años' },
              { label: 'Cuero natural', value: 'Se suaviza y crea memoria con el uso — mejora con el tiempo' },
              { label: 'Lino y lana', value: 'Tejidos que respiran — honestidad táctil, belleza que no necesita anunciarse' },
            ],
            tip: 'Un material de lujo real no necesita tratamiento para parecer caro — ya lo es. Al evaluar una pieza, pase la mano: los materiales honestos se revelan al tacto antes que cualquier etiqueta.',
          },
          {
            heading: 'El Espacio como Privilegio Máximo',
            body: 'En ciudades densas donde los metros cuadrados son moneda, el espacio mismo se ha convertido en el material más exclusivo de todos. No el espacio como vacío — sino el espacio como intención. Una habitación con espacio para respirar. Un pasillo lo suficientemente ancho para caminar despacio. Un rincón de lectura que no te exige nada más que tu presencia.\n\nEl interior de lujo de esta década devuelve el espacio a su habitante. No llena cada rincón. Confía en el silencio. Diseña para la quietud tanto como para el uso.',
          },
          {
            heading: 'Personalización por Encima del Prestigio',
            body: 'El cambio que define el lujo contemporáneo con mayor claridad es este: ha pasado del estatus a la identidad. La pregunta ya no es "¿qué dice esta habitación sobre mi riqueza?" sino "¿qué dice esta habitación sobre quién soy?"\n\nEsto es más difícil de diseñar. Requiere escuchar. Requiere entender cómo una persona se mueve por su hogar a las siete de la mañana, qué necesita de una habitación después de un día largo, qué objetos tienen significado para ella. La habitación más lujosa no es la más cara. Es la que viste a su dueño como un traje bien hecho.',
          },
        ],
        conclusion:
          'El lujo, bien entendido, no es un estilo. Es un estándar de atención — aplicado a los materiales, al espacio, al ser humano que va a vivir en él. Cuando una habitación se diseña con ese nivel de cuidado, no necesita declararse. La persona que entra simplemente lo sabe.',
        cta: 'Carol Orofino Design aporta este estándar de atención a cada proyecto. Si estás listo para invertir en un espacio construido alrededor de quien realmente eres, te invitamos a comenzar.',
      },
    },
  },
  {
    slug: 'the-discipline-of-subtraction',
    date: '2025-03-10',
    readTime: 5,
    category: 'Minimalismo',
    image: '/images/blog/discipline-of-subtraction-hero.png',
    translations: {
      en: {
        title: 'The Discipline of Subtraction',
        subtitle: 'Minimalism is not emptiness. It is the courage to keep only what matters.',
        sections: [
          {
            heading: 'What Minimalism Is Not',
            body: 'Minimalism has been misunderstood — reduced to a visual style, a Pinterest aesthetic of white walls and bare shelves. But real minimalism is not about owning fewer things. It is about making every thing deliberate.\n\nA minimalist room can contain warmth. It can contain color, texture, memory, life. What it cannot contain is noise — the visual noise of objects that have no reason to be there, furniture chosen by default, decoration that fills space without earning it.',
          },
          {
            heading: 'The Edit Is the Design',
            body: 'The most important skill in minimalist design is not what you add. It is what you remove. Every object that leaves a room makes the remaining objects more powerful. The chair that stays becomes the chair — not one of several, but the one, chosen, positioned, seen.\n\nThis is why minimalism is harder to design than maximalism. Addition is easy. Subtraction requires conviction. You have to be certain enough in what remains to let everything else go.',
            table: [
              { label: 'Stays', value: 'Pieces with defined function, durable materials, right proportion' },
              { label: 'Goes', value: 'Objects with no reason to be there, duplicates, filler decoration' },
              { label: 'Criterion', value: 'Each object must earn its place — not merely occupy it' },
              { label: 'Result', value: 'Each remaining piece becomes more powerful through the absence of the others' },
            ],
            tip: 'Before editing a space, remove everything. Reintroduce only what is missed. What was not sought after probably did not belong.',
          },
          {
            heading: 'The Emotional Weight of Objects',
            body: 'Objects carry weight — not physical, but emotional. A cluttered room is exhausting not because it is ugly, but because it asks something of you constantly. Your eye moves. Your mind makes small decisions. You register things, half-register things, avoid things.\n\nA minimalist room rests you. It holds only what deserves your attention. The result is not coldness — it is clarity. The psychological freedom of a space that does not demand.',
          },
          {
            heading: 'Minimalism as Commitment',
            body: 'The difficulty with minimalism is that it does not end at the design phase. It requires maintenance — a different relationship with objects, with purchasing, with accumulation. A minimalist interior designed without this understanding will not stay minimal.\n\nBut when the philosophy is genuinely embraced, something shifts. You begin to choose differently. You buy less, but better. You notice more. The home becomes a reflection of what actually matters — not what filled a space, but what was chosen to be there.',
          },
        ],
        conclusion:
          'A minimalist home is not a statement of restraint. It is a statement of clarity — about what you value, how you want to live, what you want to feel when you walk through your own door. That clarity is worth designing for.',
        cta: 'Carol Orofino Design creates minimalist interiors that are warm, considered, and deeply personal. If simplicity is your form of luxury, let us design it together.',
      },
      pt: {
        title: 'A Disciplina da Subtração',
        subtitle: 'Minimalismo não é vazio. É a coragem de guardar apenas o que importa.',
        sections: [
          {
            heading: 'O Que o Minimalismo Não É',
            body: 'O minimalismo foi mal compreendido — reduzido a um estilo visual, uma estética de paredes brancas e prateleiras nuas. Mas o minimalismo real não é sobre ter menos coisas. É sobre tornar cada coisa deliberada.\n\nUm ambiente minimalista pode conter calor. Pode conter cor, textura, memória, vida. O que ele não pode conter é ruído — o ruído visual de objetos que não têm razão de estar ali, móveis escolhidos por padrão, decoração que preenche o espaço sem merecê-lo.',
          },
          {
            heading: 'A Edição É o Design',
            body: 'A habilidade mais importante no design minimalista não é o que você adiciona. É o que você remove. Cada objeto que sai de um ambiente torna os objetos restantes mais poderosos. A cadeira que fica torna-se a cadeira — não uma de várias, mas aquela, escolhida, posicionada, vista.\n\nÉ por isso que o minimalismo é mais difícil de projetar do que o maximalismo. Adição é fácil. Subtração exige convicção. Você precisa ter certeza suficiente naquilo que resta para deixar todo o resto ir.',
            table: [
              { label: 'Permanece', value: 'Peças com função definida, materiais duráveis, proporção certa' },
              { label: 'Sai', value: 'Objetos sem razão de estar, duplicatas, decoração que preenche vazio' },
              { label: 'Critério', value: 'Cada objeto deve ganhar seu lugar — não apenas ocupá-lo' },
              { label: 'Resultado', value: 'Cada peça que fica se torna mais poderosa pela ausência das outras' },
            ],
            tip: 'Antes de editar um ambiente, remova tudo. Reintroduza apenas o que faz falta. O que não foi buscado provavelmente não pertencia.',
          },
          {
            heading: 'O Peso Emocional dos Objetos',
            body: 'Objetos carregam peso — não físico, mas emocional. Um ambiente cheio é cansativo não porque é feio, mas porque exige algo de você constantemente. Seu olhar se move. Sua mente toma pequenas decisões. Você registra coisas, registra pela metade, evita coisas.\n\nUm ambiente minimalista te descansa. Ele guarda apenas o que merece sua atenção. O resultado não é frieza — é clareza. A liberdade psicológica de um espaço que não exige.',
          },
          {
            heading: 'Minimalismo como Compromisso',
            body: 'A dificuldade com o minimalismo é que ele não termina na fase de projeto. Exige manutenção — uma relação diferente com os objetos, com as compras, com o acúmulo. Um interior minimalista projetado sem esse entendimento não vai permanecer minimalista.\n\nMas quando a filosofia é genuinamente abraçada, algo muda. Você começa a escolher de forma diferente. Compra menos, mas melhor. Percebe mais. O lar torna-se um reflexo do que realmente importa — não do que preencheu um espaço, mas do que foi escolhido para estar lá.',
          },
        ],
        conclusion:
          'Um lar minimalista não é uma declaração de contenção. É uma declaração de clareza — sobre o que você valoriza, como quer viver, o que quer sentir quando atravessa a própria porta. Essa clareza vale a pena ser projetada.',
        cta: 'Carol Orofino Design cria interiores minimalistas que são aconchegantes, cuidadosos e profundamente pessoais. Se a simplicidade é sua forma de luxo, vamos projetá-la juntas.',
      },
      es: {
        title: 'La Disciplina de la Sustracción',
        subtitle: 'El minimalismo no es vacío. Es el coraje de conservar solo lo que importa.',
        sections: [
          {
            heading: 'Lo Que el Minimalismo No Es',
            body: 'El minimalismo ha sido malinterpretado — reducido a un estilo visual, una estética de paredes blancas y estantes vacíos. Pero el minimalismo real no se trata de tener menos cosas. Se trata de hacer que cada cosa sea deliberada.\n\nUna habitación minimalista puede contener calidez. Puede contener color, textura, memoria, vida. Lo que no puede contener es ruido — el ruido visual de objetos que no tienen razón de estar ahí, muebles elegidos por defecto, decoración que llena el espacio sin ganárselo.',
          },
          {
            heading: 'La Edición Es el Diseño',
            body: 'La habilidad más importante en el diseño minimalista no es lo que agregas. Es lo que eliminas. Cada objeto que sale de una habitación hace que los objetos restantes sean más poderosos. La silla que se queda se convierte en la silla — no una de varias, sino la elegida, posicionada, vista.\n\nPor eso el minimalismo es más difícil de diseñar que el maximalismo. La adición es fácil. La sustracción requiere convicción. Tienes que estar suficientemente seguro de lo que permanece para dejar ir todo lo demás.',
            table: [
              { label: 'Permanece', value: 'Piezas con función definida, materiales duraderos, proporción correcta' },
              { label: 'Sale', value: 'Objetos sin razón de estar, duplicados, decoración que llena vacíos' },
              { label: 'Criterio', value: 'Cada objeto debe ganar su lugar — no solo ocuparlo' },
              { label: 'Resultado', value: 'Cada pieza que queda se vuelve más poderosa por la ausencia de las otras' },
            ],
            tip: 'Antes de editar un ambiente, retira todo. Reintroduce solo lo que hace falta. Lo que no fue buscado probablemente no pertenecía.',
          },
          {
            heading: 'El Peso Emocional de los Objetos',
            body: 'Los objetos tienen peso — no físico, sino emocional. Una habitación desordenada es agotadora no porque sea fea, sino porque te exige algo constantemente. Tu mirada se mueve. Tu mente toma pequeñas decisiones. Registras cosas, las registras a medias, las evitas.\n\nUna habitación minimalista te descansa. Conserva solo lo que merece tu atención. El resultado no es frialdad — es claridad. La libertad psicológica de un espacio que no exige.',
          },
          {
            heading: 'El Minimalismo como Compromiso',
            body: 'La dificultad con el minimalismo es que no termina en la fase de diseño. Requiere mantenimiento — una relación diferente con los objetos, con las compras, con la acumulación. Un interior minimalista diseñado sin esta comprensión no permanecerá minimalista.\n\nPero cuando la filosofía se abraza genuinamente, algo cambia. Empiezas a elegir de manera diferente. Compras menos, pero mejor. Percibes más. El hogar se convierte en un reflejo de lo que realmente importa — no de lo que llenó un espacio, sino de lo que fue elegido para estar ahí.',
          },
        ],
        conclusion:
          'Un hogar minimalista no es una declaración de contención. Es una declaración de claridad — sobre lo que valoras, cómo quieres vivir, qué quieres sentir cuando cruzas tu propia puerta. Esa claridad vale la pena diseñarla.',
        cta: 'Carol Orofino Design crea interiores minimalistas que son cálidos, cuidadosos y profundamente personales. Si la simplicidad es tu forma de lujo, diseñémosla juntos.',
      },
    },
  },
  {
    slug: 'where-silence-has-a-shape',
    date: '2025-03-20',
    readTime: 6,
    category: 'Design Escandinavo',
    image: '/images/blog/where-silence-has-a-shape-hero.png',
    translations: {
      en: {
        title: 'Where Silence Has a Shape',
        subtitle: 'On the luxury of saying less — and meaning everything.',
        sections: [
          {
            heading: 'The Architecture of Silence',
            body: "Scandinavian design understands what most interiors forget — that the most powerful element in a room is the space between objects. An armchair in pale oak, positioned before a flood of northern light. A single linen curtain, translucent as a morning in Bergen, filtering warmth without interrupting it. These are not decorative choices. They are declarations.\n\nLuxury, in this context, is not measured in quantity. It is measured in intention. Every piece earns its place. Every texture — the grain of light ash wood, the weave of undyed linen, the quiet certainty of brushed stone — tells a story that does not need to be told twice.",
          },
          {
            heading: 'Texture as Biography',
            body: 'Run your hand across the surfaces of a well-designed Scandinavian interior and you will understand things that words cannot carry. The warmth of natural oak: wood that has grown slowly, that has taken on color and character through decades of Nordic light. The slight resistance of linen, woven with a looseness that breathes. The cool, absolute stillness of pale limestone underfoot.\n\nThese textures are not accents. They are the narrative. In a palette drawn from the earth itself — ivory, warm sand, the gray of still water, the brown of aged bark — each material becomes a word in a sentence that reads: this home was built with patience.',
            table: [
              { label: 'Light oak', value: 'Warm base — ages gracefully and deepens in tone with use' },
              { label: 'Raw linen', value: 'Lightweight and breathable — ideal for curtains, upholstery, bedding' },
              { label: 'Pale limestone', value: 'Coolness and solidity — the visual anchor of Scandinavian spaces' },
              { label: 'Natural wool', value: 'Tactile warmth without visual weight — throws, cushions, rugs' },
              { label: 'Handmade ceramic', value: 'Imperfection as quality — each piece is unique and irreplaceable' },
            ],
            tip: 'In Scandinavian design, textures do not decorate — they narrate. When combining materials, prioritize tactile contrast: smooth with rough, cool with warm, opaque with translucent.',
          },
          {
            heading: 'The Luxury of Less',
            body: "There is a misconception that minimalism withholds. In truth, the most refined minimalist interiors give you everything — by refusing to take anything away from what matters.\n\nClean lines do not mean cold. A room of whites and warm beige, with a single accent in caramel leather or brushed bronze, can hold more sensory richness than ten rooms filled with ornament. The eye rests. The mind quiets. The body understands it has arrived somewhere worth staying.\n\nThis is the paradox at the heart of luxury minimalism: the less the room speaks, the more you hear.",
          },
          {
            heading: 'Light as the Most Expensive Material',
            body: 'No designer can purchase what the North gives freely — that particular quality of Scandinavian light: low, angular, generous. It travels across a room like a slow conversation, touching the texture of a wool throw, the edge of a ceramic vase, the pale grain of an unfinished wall.\n\nLight is never incidental. Sheer linen curtains are chosen not merely to soften a window, but to choreograph how light enters a room across the hours of a day. Furniture is positioned not for convention, but for the way morning light will fall. Natural light, in this philosophy, is not a supplement — it is the design itself.',
          },
        ],
        conclusion:
          'To live inside a space conceived in this language is to understand that simplicity, when pursued with absolute rigor, becomes its own form of extravagance. If you have felt that something is missing from your interior — and cannot quite name it — perhaps what is missing is exactly that: less.',
        cta: 'Carol Orofino Design translates this philosophy into spaces that live and breathe with you. For clients seeking interiors where calm is a deliberate luxury, we invite you to begin a conversation.',
      },
      pt: {
        title: 'Onde o Silêncio Tem Forma - Design Escandinavo',
        subtitle: 'Sobre o luxo de dizer menos — e significar tudo.',
        sections: [
          {
            heading: 'A Arquitetura do Silêncio',
            body: 'O design escandinavo compreende o que a maioria dos interiores esquece — que o elemento mais poderoso de um ambiente é o espaço entre os objetos. Uma poltrona em carvalho claro, posicionada diante de uma inundação de luz natural. Uma única cortina de linho, translúcida como uma manhã em Bergen, filtrando o calor sem interrompê-lo. Essas não são escolhas decorativas. São declarações.\n\nO luxo, nesse contexto, não se mede em quantidade. Mede-se em intenção. Cada peça conquista seu lugar. Cada textura — o fio da madeira clara, o tecido do linho cru, a certeza quieta da pedra escovada — conta uma história que não precisa ser repetida.',
          },
          {
            heading: 'Textura como Biografia',
            body: 'Passe a mão pelas superfícies de um interior escandinavo bem concebido e você entenderá coisas que as palavras não alcançam. O calor do carvalho natural: madeira que cresceu devagar, que ganhou cor e caráter através de décadas de luz nórdica. A leve resistência do linho, tecido com uma frouxidão que respira. A frescura absoluta e quieta do calcário claro sob os pés.\n\nEssas texturas não são acentos. São a narrativa. Em uma paleta extraída da própria terra — marfim, areia quente, o cinza das águas paradas, o marrom da casca envelhecida — cada material torna-se uma palavra em uma frase que diz: esta casa foi construída com paciência.',
            table: [
              { label: 'Carvalho claro', value: 'Base quente — envelhece com graça e aprofunda o tom com o uso' },
              { label: 'Linho cru', value: 'Leve e respirável — ideal para cortinas, estofados, roupa de cama' },
              { label: 'Calcário claro', value: 'Frescura e solidez — âncora visual dos espaços escandinavos' },
              { label: 'Lã natural', value: 'Calor tátil sem peso visual — cobertores, almofadas, tapetes' },
              { label: 'Cerâmica artesanal', value: 'Imperfeição como qualidade — cada peça é única e insubstituível' },
            ],
            tip: 'No design escandinavo, as texturas não decoram — narram. Ao combinar materiais, priorize o contraste tátil: liso com rugoso, frio com quente, opaco com translúcido.',
          },
          {
            heading: 'O Luxo do Menos',
            body: 'Há um equívoco sobre o minimalismo: que ele retém. Na verdade, os interiores minimalistas mais refinados te dão tudo — ao recusar tirar qualquer coisa daquilo que importa.\n\nLinhas limpas não significam frieza. Um ambiente de brancos e bege quente, com um único acento em couro caramelo ou bronze escovado, pode conter mais riqueza sensorial do que dez ambientes repletos de ornamentos. Os olhos descansam. A mente se aquieta. O corpo entende que chegou a algum lugar que vale a pena ficar.\n\nEsse é o paradoxo no coração do luxo minimalista: quanto menos o ambiente fala, mais você ouve.',
          },
          {
            heading: 'A Luz como o Material Mais Caro',
            body: 'Nenhum designer pode comprar o que o Norte oferece livremente — aquela qualidade particular da luz escandinava: baixa, angular, generosa. Ela percorre um ambiente como uma conversa lenta, tocando a textura de uma manta de lã, a borda de um vaso de cerâmica, o fio pálido de uma parede inacabada.\n\nA luz nunca é incidental. Cortinas de linho translúcido são escolhidas não apenas para suavizar uma janela, mas para coreografar como a luz entra em um ambiente ao longo das horas do dia. O mobiliário é posicionado não por convenção, mas pela forma como a luz da manhã vai pousar. A luz natural, nessa filosofia, não é um suplemento — ela é o design.',
          },
        ],
        conclusion:
          'Habitar um espaço concebido nessa linguagem é compreender que a simplicidade, quando perseguida com rigor absoluto, torna-se sua própria forma de extravagância. Se você sentiu que algo está faltando no seu interior — e não consegue nomear exatamente o quê — talvez o que falta seja precisamente isso: menos.',
        cta: 'Carol Orofino Design traduz essa filosofia em espaços que vivem e respiram com você. Para clientes que buscam interiores onde a calma é um luxo deliberado, convidamos você a iniciar uma conversa.',
      },
      es: {
        title: 'Donde el Silencio Tiene Forma',
        subtitle: 'Sobre el lujo de decir menos — y significarlo todo.',
        sections: [
          {
            heading: 'La Arquitectura del Silencio',
            body: 'El diseño escandinavo comprende lo que la mayoría de los interiores olvida — que el elemento más poderoso de una habitación es el espacio entre los objetos. Un sillón en roble claro, posicionado frente a una inundación de luz natural. Una única cortina de lino, translúcida como una mañana en Bergen, filtrando el calor sin interrumpirlo. Estas no son elecciones decorativas. Son declaraciones.\n\nEl lujo, en este contexto, no se mide en cantidad. Se mide en intención. Cada pieza gana su lugar. Cada textura — el veteado de la madera clara, el tejido del lino crudo, la quieta certeza de la piedra cepillada — cuenta una historia que no necesita repetirse.',
          },
          {
            heading: 'Textura como Biografía',
            body: 'Desliza la mano por las superficies de un interior escandinavo bien concebido y comprenderás cosas que las palabras no pueden transportar. El calor del roble natural: madera que ha crecido despacio, que ha tomado color y carácter a través de décadas de luz nórdica. La leve resistencia del lino, tejido con una holgura que respira. La frescura absoluta y quieta de la piedra caliza clara bajo los pies.\n\nEstas texturas no son acentos. Son la narrativa. En una paleta extraída de la propia tierra — marfil, arena cálida, el gris de las aguas quietas, el marrón de la corteza envejecida — cada material se convierte en una palabra en una frase que dice: esta casa fue construida con paciencia.',
            table: [
              { label: 'Roble claro', value: 'Base cálida — envejece con gracia y profundiza el tono con el uso' },
              { label: 'Lino crudo', value: 'Ligero y transpirable — ideal para cortinas, tapizados, ropa de cama' },
              { label: 'Piedra caliza clara', value: 'Frescura y solidez — ancla visual de los espacios escandinavos' },
              { label: 'Lana natural', value: 'Calidez táctil sin peso visual — mantas, cojines, alfombras' },
              { label: 'Cerámica artesanal', value: 'La imperfección como calidad — cada pieza es única e irremplazable' },
            ],
            tip: 'En el diseño escandinavo, las texturas no decoran — narran. Al combinar materiales, prioriza el contraste táctil: liso con rugoso, frío con cálido, opaco con translúcido.',
          },
          {
            heading: 'El Lujo de lo Menos',
            body: 'Existe un error sobre el minimalismo: que retiene. En realidad, los interiores minimalistas más refinados te dan todo — al negarse a quitarte nada de lo que importa.\n\nLas líneas limpias no significan frialdad. Una habitación de blancos y beige cálido, con un único acento en cuero caramelo o bronce cepillado, puede contener más riqueza sensorial que diez habitaciones llenas de ornamentos. Los ojos descansan. La mente se aquieta. El cuerpo entiende que ha llegado a un lugar que vale la pena habitar.\n\nEsta es la paradoja en el corazón del lujo minimalista: cuanto menos habla el espacio, más escuchas.',
          },
          {
            heading: 'La Luz como el Material Más Caro',
            body: 'Ningún diseñador puede comprar lo que el Norte ofrece libremente — esa calidad particular de la luz escandinava: baja, angular, generosa. Recorre una habitación como una conversación lenta, tocando la textura de una manta de lana, el borde de un jarrón de cerámica, el veteado pálido de una pared sin acabar.\n\nLa luz nunca es incidental. Las cortinas de lino translúcido se eligen no solo para suavizar una ventana, sino para coreografiar cómo la luz entra en una habitación a lo largo de las horas del día. El mobiliario se posiciona no por convención, sino por la forma en que la luz de la mañana caerá. La luz natural, en esta filosofía, no es un suplemento — es el diseño.',
          },
        ],
        conclusion:
          'Vivir en un espacio concebido en este lenguaje es comprender que la simplicidad, cuando se persigue con rigor absoluto, se convierte en su propia forma de extravagancia. Si has sentido que algo falta en tu interior — y no puedes nombrarlo con exactitud — quizás lo que falta es precisamente eso: menos.',
        cta: 'Carol Orofino Design traduce esta filosofía en espacios que viven y respiran contigo. Para clientes que buscan interiores donde la calma es un lujo deliberado, te invitamos a iniciar una conversación.',
      },
    },
  },
]
