// src/data/mockData.js
// Local mock data - no server needed!

export const authors = [
  {
    "id": "1",
    "name": "Brandon Sanderson",
    "bio": "Author of epic fantasy novels...",
    "avatarUrl": "https://i.pinimg.com/1200x/b0/00/21/b000210df0ebc05905dede32ada9f993.jpg",
    "createdAt": "2025-01-01T10:00:00Z",
    "updatedAt": "2025-01-01T10:00:00Z"
  },
  {
    "name": "Agatha Christie",
    "bio": "Queen of mystery novels...",
    "avatarUrl": "https://i.pinimg.com/736x/44/ff/51/44ff51260d8366192f494805795ad6dd.jpg",
    "updatedAt": "2025-08-12T13:10:33.861Z",
    "id": "2"
  },
  {
    "name": "Marwan",
    "bio": "controvorsial author",
    "avatarUrl": "https://i.pinimg.com/736x/b8/e6/66/b8e666f3afd5324c31ab651e1ed93426.jpg",
    "updatedAt": "2025-08-13T11:17:41.516Z",
    "id": "c391"
  },
  {
    "name": "fish",
    "bio": "fish",
    "avatarUrl": "https://i.pinimg.com/736x/90/c3/57/90c357e05fafc3a3293725825b0812b2.jpg",
    "updatedAt": "2025-08-12T13:09:17.851Z",
    "id": "7845"
  },
  {
    "id": "fb1a",
    "name": "Akira",
    "bio": "very artistic type of author likes to explore more of the world beauty than just the philosphy of everything",
    "avatarUrl": "https://i.pinimg.com/474x/a4/83/aa/a483aab604cb2f0dd08ed6f5039415e8.jpg",
    "createdAt": "2025-08-12T13:10:10.301Z",
    "updatedAt": "2025-08-12T13:10:10.301Z"
  },
  {
    "id": "e30f",
    "name": "AKI",
    "bio": "adventurous",
    "avatarUrl": "https://i.pinimg.com/736x/7b/37/4b/7b374b0ee753e542464bac9344d89b86.jpg",
    "createdAt": "2025-08-12T14:23:29.276Z",
    "updatedAt": "2025-08-12T14:23:29.276Z"
  },
  {
    "id": "a326",
    "name": "Maryam",
    "bio": "deluquient author",
    "avatarUrl": "https://i.pinimg.com/736x/8b/fd/74/8bfd74d58fe5d465755f519a5eceeb0c.jpg",
    "createdAt": "2025-08-13T11:13:22.143Z",
    "updatedAt": "2025-08-13T11:13:22.143Z"
  }
]

export const books = [
  {
    "title": "Mistborn",
    "authorId": "1",
    "year": 2006,
    "tags": ["fantasy"],
    "coverUrl": "https://i.pinimg.com/736x/d8/dc/7f/d8dc7fbe2eea8b424da6f8740c32ce43.jpg",
    "description": "A high fantasy adventure...",
    "updatedAt": "2025-08-12T14:39:52.186Z",
    "id": "1"
  },
  {
    "title": "The Murder of Roger Ackroyd",
    "authorId": "2",
    "year": 1926,
    "tags": ["mystery"],
    "coverUrl": "https://i.pinimg.com/1200x/70/d1/b4/70d1b4f08b73ce854928846b712da8d0.jpg",
    "description": "One of the most celebrated detective novels...",
    "updatedAt": "2025-08-12T13:45:06.411Z",
    "id": "2"
  },
  {
    "id": "0389",
    "title": "Jujustu kaisen",
    "authorId": "fb1a",
    "year": 2019,
    "tags": ["fiction", "fantasy", "action"],
    "coverUrl": "https://i.pinimg.com/1200x/38/78/07/38780793e4ddbc2e978bb132c85c1886.jpg",
    "description": "a manga that tells the story of the strongest yet the weakest jujustu sorcerer",
    "createdAt": "2025-08-12T13:44:08.414Z",
    "updatedAt": "2025-08-12T13:44:08.415Z"
  },
  {
    "id": "864e",
    "title": "AVATAR",
    "authorId": "e30f",
    "year": 2023,
    "tags": ["fiction"],
    "coverUrl": "https://i.pinimg.com/736x/16/18/61/161861c7f122428bf6d34579ec73fc68.jpg",
    "description": "the new avatar in the modern 2030 life still survived but doesnt want to continue the legacy even though its the last of its blood",
    "createdAt": "2025-08-12T14:24:56.059Z",
    "updatedAt": "2025-08-12T14:24:56.059Z"
  },
  {
    "title": "SpiderPunk",
    "authorId": "c391",
    "year": 2017,
    "tags": ["fantasy", "fiction", "action", "drama", "adventure"],
    "coverUrl": "https://i.pinimg.com/736x/68/67/8d/68678d96f37c2bccfb49b3535d3c36f4.jpg",
    "description": "Just not your regular spiderman...",
    "updatedAt": "2025-08-13T11:19:14.725Z",
    "id": "9685"
  },
  {
    "id": "28ac",
    "title": "Tokyo Ghoul",
    "authorId": "e30f",
    "year": 2012,
    "tags": ["mystery"],
    "coverUrl": "https://i.pinimg.com/1200x/62/b9/4c/62b94c7d85309d5cbd311aba22221284.jpg",
    "description": "bro thought he was getting a kiss",
    "createdAt": "2025-08-12T14:39:12.664Z",
    "updatedAt": "2025-08-12T14:39:12.664Z"
  },
  {
    "id": "8e18",
    "title": "THE CITY",
    "authorId": "e30f",
    "year": 2019,
    "tags": ["fantasy", "fiction"],
    "coverUrl": "https://i.pinimg.com/736x/b9/ca/69/b9ca69ac0c80d66caa42bf021f2c7239.jpg",
    "description": "the dark world",
    "createdAt": "2025-08-12T15:25:58.255Z",
    "updatedAt": "2025-08-12T15:25:58.255Z"
  },
  {
    "id": "a164",
    "title": "Mind Maze",
    "authorId": "a326",
    "year": 2019,
    "tags": ["fantasy"],
    "coverUrl": "https://i.pinimg.com/1200x/a3/c0/4e/a3c04e0dba62f522a44efe233afadb96.jpg",
    "description": "confusing for sure...",
    "createdAt": "2025-08-13T11:14:30.741Z",
    "updatedAt": "2025-08-13T11:14:30.741Z"
  },
  {
    "id": "986c",
    "title": "The Fighter?",
    "authorId": "a326",
    "year": 2023,
    "tags": ["mystery"],
    "coverUrl": "https://i.pinimg.com/736x/d3/4d/50/d34d50434cc2a1ea02a5964add96aa1e.jpg",
    "description": "hide",
    "createdAt": "2025-08-13T11:15:24.526Z",
    "updatedAt": "2025-08-13T11:15:24.526Z"
  },
  {
    "id": "2d06",
    "title": "The Revenant",
    "authorId": "a326",
    "year": 2025,
    "tags": ["fiction", "fantasy", "action"],
    "coverUrl": "https://i.pinimg.com/1200x/70/5e/42/705e4260856880e923b4143cbb73ed78.jpg",
    "description": "when the dead wants revenge you better ask why before running",
    "createdAt": "2025-08-13T11:16:24.044Z",
    "updatedAt": "2025-08-13T11:16:24.044Z"
  },
  {
    "id": "d079",
    "title": "12AM curse",
    "authorId": "c391",
    "year": 2023,
    "tags": ["fiction"],
    "coverUrl": "https://i.pinimg.com/1200x/75/59/6e/75596e4bce1f21747b4135eb2f3445dd.jpg",
    "description": "you will be confused for sure",
    "createdAt": "2025-08-13T11:18:55.900Z",
    "updatedAt": "2025-08-13T11:18:55.900Z"
  },
  {
    "id": "8f0c",
    "title": "The Night I fell into the abyss",
    "authorId": "e30f",
    "year": 2023,
    "tags": ["Romance"],
    "coverUrl": "https://i.pinimg.com/736x/ef/a1/14/efa114babeecaa7955683dc1b703d311.jpg",
    "description": "when real connection happens nothing can break it",
    "createdAt": "2025-08-13T19:46:11.668Z",
    "updatedAt": "2025-08-13T19:46:11.668Z"
  },
  {
    "id": "7ae8",
    "title": "The Samurai girl",
    "authorId": "e30f",
    "year": 2019,
    "tags": ["adventure"],
    "coverUrl": "https://i.pinimg.com/1200x/43/06/1e/43061e758750175deeaa4e3f4d97d469.jpg",
    "description": "Only the blade is in control",
    "createdAt": "2025-08-13T19:47:50.730Z",
    "updatedAt": "2025-08-13T19:47:50.730Z"
  },
  {
    "id": "a0b3",
    "title": "Give Up",
    "authorId": "e30f",
    "year": 2020,
    "tags": ["Psychology"],
    "coverUrl": "https://i.pinimg.com/736x/2a/b6/d1/2ab6d120aba69431b36bd073f7370e9a.jpg",
    "description": "once a professional rising ballerina had everything switched in her mind\ncant tell whats real or not anymore..",
    "createdAt": "2025-08-13T19:50:47.121Z",
    "updatedAt": "2025-08-13T19:50:47.122Z"
  },
  {
    "id": "a886",
    "title": "Hope",
    "authorId": "7845",
    "year": 2025,
    "tags": ["fiction"],
    "coverUrl": "https://i.pinimg.com/1200x/6e/a2/6c/6ea26cbea106b71237d0a79cc47fabf9.jpg",
    "description": "",
    "createdAt": "2025-08-13T19:52:38.081Z",
    "updatedAt": "2025-08-13T19:52:38.081Z"
  },
  {
    "id": "f74a",
    "title": "The Light",
    "authorId": "1",
    "year": 2020,
    "tags": ["mystery"],
    "coverUrl": "https://i.pinimg.com/736x/4d/f7/3d/4df73df692bb6b488060e2a97619601b.jpg",
    "description": "",
    "createdAt": "2025-08-13T19:53:07.993Z",
    "updatedAt": "2025-08-13T19:53:07.993Z"
  },
  {
    "id": "273d",
    "title": "the butterfly",
    "authorId": "2",
    "year": 2023,
    "tags": ["fiction"],
    "coverUrl": "https://i.pinimg.com/1200x/8b/eb/27/8beb27be1d9691db73a6a661e4e94651.jpg",
    "description": "",
    "createdAt": "2025-08-13T19:53:40.348Z",
    "updatedAt": "2025-08-13T19:53:40.348Z"
  },
  {
    "id": "4965",
    "title": "the pretty fairy",
    "authorId": "a326",
    "year": 2024,
    "tags": ["mystery"],
    "coverUrl": "https://i.pinimg.com/736x/70/fe/86/70fe8682b8d52071f963d24e8e2cc8a4.jpg",
    "description": "",
    "createdAt": "2025-08-13T19:54:14.345Z",
    "updatedAt": "2025-08-13T19:54:14.345Z"
  },
  {
    "id": "d8e7",
    "title": "Do You Think About Me?",
    "authorId": "e30f",
    "year": 2022,
    "tags": ["mystery"],
    "coverUrl": "https://i.pinimg.com/736x/0d/5c/2e/0d5c2ea0dae5387e45ca85e3784db85e.jpg",
    "description": "",
    "createdAt": "2025-08-13T19:56:45.520Z",
    "updatedAt": "2025-08-13T19:56:45.520Z"
  }
]