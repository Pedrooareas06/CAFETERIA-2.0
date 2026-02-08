export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    longDescription: string;
    price: number;
    image: string;
    tag?: string;
    tagColor?: string;
    category: "quente" | "gelado" | "especial";
    ingredients: string[];
    sizes: { label: string; priceAdd: number }[];
  }
  
  export const products: Product[] = [
    {
      id: "espresso",
      name: "Espresso",
      slug: "espresso",
      description: "Puro, intenso e encorpado. A essencia do cafe.",
      longDescription:
        "Nosso espresso e preparado com graos 100% arabica de origem unica, torrados artesanalmente para extrair notas de chocolate amargo e caramelo. Servido na temperatura perfeita, com crema dourada e aveludada que so um cafe de qualidade proporciona.",
      price: 8.0,
      image: "/images/espresso.jpg",
      category: "quente",
      ingredients: ["Cafe 100% Arabica", "Agua filtrada"],
      sizes: [
        { label: "Curto (30ml)", priceAdd: 0 },
        { label: "Duplo (60ml)", priceAdd: 4 },
      ],
    },
    {
      id: "cappuccino",
      name: "Cappuccino Classico",
      slug: "cappuccino",
      description: "Cremoso com espuma aveludada e latte art.",
      longDescription:
        "O cappuccino perfeito: um terco de espresso encorpado, um terco de leite vaporizado e um terco de espuma cremosa. Decorado com latte art artesanal e uma leve camada de canela. O favorito absoluto dos nossos clientes.",
      price: 12.0,
      image: "/images/cappuccino.jpg",
      tag: "Mais Vendido",
      tagColor: "bg-amber-100 text-amber-800",
      category: "quente",
      ingredients: ["Cafe Arabica", "Leite integral", "Canela"],
      sizes: [
        { label: "Pequeno (200ml)", priceAdd: 0 },
        { label: "Medio (350ml)", priceAdd: 4 },
        { label: "Grande (450ml)", priceAdd: 7 },
      ],
    },
    {
      id: "cafe-gelado",
      name: "Cafe Gelado",
      slug: "cafe-gelado",
      description: "Refrescante e saboroso para dias quentes.",
      longDescription:
        "Cafe especial extraido e resfriado rapidamente para preservar todos os aromas e sabores. Servido com gelo artesanal de cafe (sem diluir!) e um toque de leite. A escolha perfeita para quem quer se refrescar sem abrir mao do sabor.",
      price: 10.0,
      image: "/images/iced-coffee.jpg",
      category: "gelado",
      ingredients: ["Cafe especial", "Gelo artesanal", "Leite"],
      sizes: [
        { label: "Medio (350ml)", priceAdd: 0 },
        { label: "Grande (500ml)", priceAdd: 4 },
      ],
    },
    {
      id: "latte",
      name: "Latte",
      slug: "latte",
      description: "Cafe suave com leite vaporizado e arte.",
      longDescription:
        "Para quem aprecia um cafe mais suave e cremoso. Nosso latte leva uma dose generosa de leite vaporizado sobre espresso de origem unica, finalizado com latte art exclusiva. Disponivel tambem na versao com leite vegetal.",
      price: 14.0,
      image: "/images/latte.jpg",
      category: "quente",
      ingredients: [
        "Cafe Arabica",
        "Leite vaporizado",
        "Opcao leite vegetal",
      ],
      sizes: [
        { label: "Pequeno (250ml)", priceAdd: 0 },
        { label: "Medio (350ml)", priceAdd: 3 },
        { label: "Grande (450ml)", priceAdd: 6 },
      ],
    },
    {
      id: "mocha",
      name: "Mocha Premium",
      slug: "mocha",
      description: "Cafe com chocolate belga e chantilly.",
      longDescription:
        "A uniao perfeita entre cafe e chocolate. Espresso robusto combinado com calda de chocolate belga artesanal, leite vaporizado e finalizado com chantilly fresco e raspas de chocolate. Um verdadeiro abraco em forma de bebida.",
      price: 15.0,
      image: "/images/mocha.jpg",
      tag: "Novidade",
      tagColor: "bg-rose-100 text-rose-800",
      category: "especial",
      ingredients: [
        "Cafe Arabica",
        "Chocolate belga",
        "Leite",
        "Chantilly",
      ],
      sizes: [
        { label: "Medio (350ml)", priceAdd: 0 },
        { label: "Grande (450ml)", priceAdd: 5 },
      ],
    },
    {
      id: "cold-brew",
      name: "Cold Brew 12h",
      slug: "cold-brew",
      description: "Extraido a frio por 12 horas, suave e doce.",
      longDescription:
        "Nosso cold brew e preparado com imersao a frio durante 12 horas, resultando em um cafe ultra-suave, naturalmente doce e sem acidez. Servido gelado em garrafa artesanal. O segredo dos nossos clientes mais fieis para enfrentar o calor paulistano.",
      price: 13.0,
      image: "/images/cold-brew.jpg",
      tag: "Refrescante",
      tagColor: "bg-sky-100 text-sky-800",
      category: "gelado",
      ingredients: ["Cafe especial", "Agua filtrada gelada"],
      sizes: [
        { label: "Garrafa 300ml", priceAdd: 0 },
        { label: "Garrafa 500ml", priceAdd: 6 },
      ],
    },
    {
      id: "affogato",
      name: "Affogato",
      slug: "affogato",
      description: "Espresso quente sobre sorvete de baunilha.",
      longDescription:
        "A sobremesa italiana mais amada, reinventada com nosso espresso artesanal. Uma dose dupla de espresso quente derramada sobre uma generosa bola de sorvete de baunilha madagascar. A combinacao do quente com o gelado cria uma experiencia unica.",
      price: 16.0,
      image: "/images/affogato.jpg",
      tag: "Especial",
      tagColor: "bg-violet-100 text-violet-800",
      category: "especial",
      ingredients: [
        "Espresso duplo",
        "Sorvete de baunilha",
        "Calda de caramelo",
      ],
      sizes: [{ label: "Classico", priceAdd: 0 }],
    },
  ];
  
  export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
  }
  
  export function formatPrice(price: number): string {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  }
  