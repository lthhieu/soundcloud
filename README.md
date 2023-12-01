# 1. Tính năng chính:
+ Đăng nhập : hỗ trợ đăng nhập với Google/Github và tài khoản local của backend.
Có khả năng hỗ trợ đăng nhập với các nền tảng được liệt kê tại đây: https://nextauth.js.org/providers/
+ Nghe nhạc với:
    - audio track ở footer
    - wavetrack khi xem chi tiết
+ Comment theo thời gian của wavetrack
+ Tạo playlist, thêm tracks vào playlist
+ Like tracks
+ Upload tracks
+ Với giao diện admin: CRUD users/tracks/comments...

# 2. Công nghệ sử dụng

## Frontend:
- Client: Nextjs 13, MUI (typescript). Login with Next-auth (hỗ trợ đăng nhập Google/Github và Credential Provider (backend))
- Admin: Vite, Antd (typescript)

## Nextjs:
- Nextjs 13 với App Router (typescript)
- Nắm vững các kiến thức thay đổi của Nextjs:
    + Routing (dynamic routes, route groups)
    + Data Fetching (Server component vs Client component (use client))
    + Authentication with Next-auth (sử dụng Session/JWT/Refresh Token)
    + SEO (mức basic, test với lighthouse built-in extension)
+ Rendering:
    - client side rendering (CSR), 
    - server side rendering (SSR),
    - static site generation (SSG), 
    - incremental Static Regeneration (ISR)

# 3. Giao diện

## SEO score

![image](https://github.com/lthhieu/soundcloud/assets/100410064/d2f7cc04-3f24-42c0-b422-7160d372c6a3)

## Homepage

![image](https://github.com/lthhieu/soundcloud/assets/100410064/de29285e-3fe0-464a-bf46-24137edf8b43)

## Track detail

![image](https://github.com/lthhieu/soundcloud/assets/100410064/b0ca1310-94f3-45bd-b0a9-ba429067203f)

![image](https://github.com/lthhieu/soundcloud/assets/100410064/657a3711-56b2-42ae-bbaf-925f9a7a91b8)

## Search

![image](https://github.com/lthhieu/soundcloud/assets/100410064/e45130f5-d284-4108-8ae8-9d764989367d)

## Playlist

![image](https://github.com/lthhieu/soundcloud/assets/100410064/bd381b5b-9e43-4c33-a481-418779cc695f)

![image](https://github.com/lthhieu/soundcloud/assets/100410064/fa4e96e9-8a3d-4bee-81a1-5e5e9231b90f)

![image](https://github.com/lthhieu/soundcloud/assets/100410064/19005ec9-a429-4d85-9b78-d78d3b04fd2a)

# Like page

![image](https://github.com/lthhieu/soundcloud/assets/100410064/6ecbba52-d01e-4847-b192-4b6e98d0d7e9)

## Upload page

![image](https://github.com/lthhieu/soundcloud/assets/100410064/a0dd8fc6-df20-4fcb-81db-5414ba36cca6)

![image](https://github.com/lthhieu/soundcloud/assets/100410064/0b6eb982-14c8-4ff3-b477-2ddca6cd1892)

## Profile page

![image](https://github.com/lthhieu/soundcloud/assets/100410064/738643c1-f443-40c2-9541-7d730646dd0a)

## SignIn

![image](https://github.com/lthhieu/soundcloud/assets/100410064/f92f7bad-9f87-47ec-802a-b82a991f72d9)

## Users page (Admin)

![image](https://github.com/lthhieu/soundcloud/assets/100410064/c3526eb6-56fb-4d0d-9f31-7a1f83344bc7)

## Tracks page (Admin)

![image](https://github.com/lthhieu/soundcloud/assets/100410064/65b4a45a-819d-42f6-b58f-35df873771f9)

## Comments page (Admin)

![image](https://github.com/lthhieu/soundcloud/assets/100410064/45edf513-2ba1-4adb-a8f1-d9670d5915b3)