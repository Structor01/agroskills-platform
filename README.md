# AgroSkills Platform - Plataforma Whitelabel para Membros

Uma plataforma whitelabel moderna para membros, desenvolvida com React Native e Expo, baseada nos mockups do AgroSkills com UX inspirada no Netflix.

## 🚀 Características

- **Cross-Platform**: Funciona em Web, iOS e Android
- **UX Moderna**: Interface inspirada no Netflix com carrosséis horizontais
- **Design Responsivo**: Adaptável para diferentes tamanhos de tela
- **Dados Mocados**: Sistema completo de demonstração
- **TypeScript**: Tipagem estática para maior confiabilidade
- **Context API**: Gerenciamento de estado global

## 📱 Telas Implementadas

### Dashboard
- Saudação personalizada
- Progresso circular do usuário (65%)
- Seção "Continuar de onde parou"
- Recomendações personalizadas
- Cards de cursos em carrossel horizontal

### Biblioteca
- Exploração categorizada de conteúdo
- Filtros por categoria
- Cards visuais de cursos
- Sistema de busca (em desenvolvimento)

### Perfil
- Informações do usuário
- Competências e conquistas
- Atividades recentes (em desenvolvimento)

## 🛠 Tecnologias Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **Context API** - Gerenciamento de estado
- **React Native Elements** - Componentes de UI

## 🎨 Design System

### Cores
- **Primária**: Preto (#000000)
- **Secundária**: Prata (#C0C0C0)
- **Destaque**: Verde Limão (#AADD00) - Cor da marca AgroSkills
- **Fundo**: Branco (#FFFFFF)

### Princípios
- Minimalismo e foco
- Hierarquia clara
- Espaçamento generoso
- Interface intuitiva

## 📊 Dados Mocados

O projeto inclui dados simulados para demonstração:

- **Usuários**: Carlos Mendes (Engenheiro Agrônomo)
- **Cursos**: 5 cursos de exemplo com diferentes categorias
- **Progresso**: Sistema de tracking de progresso por módulo
- **Competências**: Sistema de habilidades e conquistas

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Structor01/agroskills-platform.git

# Entre no diretório
cd agroskills-platform

# Instale as dependências
npm install

# Execute o projeto
npm run web     # Para web
npm run android # Para Android
npm run ios     # Para iOS
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm start

# Abra no navegador
npm run web

# Para mobile, use o Expo Go app e escaneie o QR code
```

## 📁 Estrutura do Projeto

```
agroskills-platform/
├── app/                    # Telas principais (Expo Router)
│   ├── (tabs)/            # Navegação por tabs
│   │   ├── index.tsx      # Dashboard
│   │   ├── library.tsx    # Biblioteca
│   │   └── profile.tsx    # Perfil
│   └── _layout.tsx        # Layout principal
├── components/            # Componentes reutilizáveis
├── contexts/              # Context API
│   └── AppContext.tsx     # Estado global
├── data/                  # Dados mocados
│   ├── types/             # Interfaces TypeScript
│   ├── users.ts           # Dados de usuários
│   ├── courses.ts         # Dados de cursos
│   └── progress.ts        # Dados de progresso
├── constants/             # Constantes (cores, etc.)
└── hooks/                 # Hooks customizados
```

## 🎯 Próximos Passos

### Fase 5: Carrosséis e Componentes Avançados
- [ ] Implementar carrosséis horizontais estilo Netflix
- [ ] Cards de conteúdo mais visuais
- [ ] Animações e transições suaves
- [ ] Componentes de loading

### Fase 6: Testes e Otimização
- [ ] Testes de responsividade
- [ ] Otimização de performance
- [ ] Compatibilidade cross-platform
- [ ] Loading states

### Fase 7: Deploy e Documentação
- [ ] Build para produção
- [ ] Deploy web (Netlify/Vercel)
- [ ] Build mobile (EAS Build)
- [ ] Documentação completa

## 🔧 Funcionalidades Whitelabel

O projeto está preparado para ser facilmente customizado:

- **Cores**: Sistema de cores centralizadas
- **Logo**: Componente de logo reutilizável
- **Conteúdo**: Dados facilmente substituíveis
- **Branding**: Configurações de marca centralizadas

## 📝 Licença

Este projeto é desenvolvido para fins de demonstração e prototipagem.

## 👥 Contribuição

Desenvolvido por Structor01 baseado nos mockups do AgroSkills.

---

**Status**: Em desenvolvimento ativo
**Versão**: 1.0.0
**Última atualização**: Junho 2025

