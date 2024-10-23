
# Next.js + Nest.js + Redux + MongoDB Project

## GOiiGoii(Shopping Mall) Project Next.js + Nest.js + Redux based On TypeScript
---

## Project Background and Motivation
- At the time of preparing to open a Wrapping shop called goigoii, a shopping mall site was originally created using the Cafe24 platform. I wanted to make my own system, so I proceeded with the project.

## Project Objectives
- Enhance frontend design and UI development skills.
- Improve understanding and development skills of API servers.
- Elevate full stack developing knowledge with using next.js & nest.js frameworks

## Development Environment
- **Main Server:** [Koyeb](url)
- **Environment:** Node.js (v21.2.0)
- **Language:** TypeScript
- **Frameworks:** Next (v14.2.3), @nestjs/common (v10.4.1), @nestjs/cli (v10.4.4)
- **Database:**
    - MongoDB (v5.7.0)
    - ODM: Mongoose (v8.5.0)
- **Tools:** VSCode (IDE for code writing), Postman (API testing)
- **Libraries/Packages:**
    - react-bootstrap (v2.8.0)
    - chakra-ui/react (v2.8.1)
    - tsparticles (v2.11.0)
    - typewriter-effect (v2.20.1)
    - redux (v5.0.1)
    - aos
    - @types/bcrypt (v5.0.2)
    - tailwindcss (v3.4.1)
    - react-slick (v0.30.2)
    - redux-thunk (v3.1.0)
    - emailjs-com (v3.2.0)
    - firebase (v10.13.0)
    - swiper (v11.1.14)

---

### Key Features
- [x] Login, Logout
- [x] User Registration
- [x] Add product by admin User
- [x] shop(search By catagory)
- [x] shop Detail(add cart)
- [x] About company
- [x] Archive
- [x] Contact company

#### Frameworks & Runtimes
- [x] NEXT.js
- [x] NEST.js
- [x] Node.js
- [x] FireBase
- [x] MongoDB

#### Packages & Libraries
- [x] tailwindcss
- [x] redux
- [x] react-slick 
- [x] babel
- [x] aos
- [x] emailjs-com
- [x] MongoDB
- [x] Mongoose

---

## API Calls: (Redux)


types.ts

```tsx
export const LOGIN_USER = "login_user";
export const IDCHECK_USER = "idcheck_user";
...etc
```

Shopreducer.ts

```tsx
import { GET_ALLPRODUCTS, GET_PRODUCT_DETAIL, GET_PRODUCTS_BY_CATEGORY } from "../types";

export default function shopReducer(state = {}, action: any) {
  switch (action.type) {
    case GET_ALLPRODUCTS:
      return { ...state, getAllProductsSuccess: action.payload };
      break;
    case GET_PRODUCTS_BY_CATEGORY:
      return { ...state, getProductsByatagorySuccess: action.payload };
      break;
    case GET_PRODUCT_DETAIL:
      return { ...state, getProductDetailSuccess: action.payload };
      break;
    default:
      return state;
  }
}

...etc
```

shopActions.ts

```tsx
import axios from "axios";
import {
  GET_ALLPRODUCTS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS_BY_CATEGORY,
} from "../types";

//검색한 장르 영화목록 가져오기
export function getAllProducts() {
  const request = axios
    .get("http://localhost:3001/products/getAllProducts") // NestJS API 엔드포인트
    .then((response) => response.data);
  return {
    type: GET_ALLPRODUCTS,
    payload: request,
  };
}
export function getProductsByCategory(category: string) {
  const request = axios
    .get(`http://localhost:3001/products/category`, { params: { category } })
    .then((response) => response.data);

  return {
    type: GET_PRODUCTS_BY_CATEGORY,
    payload: request,
  };
}
export const getProductDetail = (productId: string) => {
  const request = axios
    .get(`http://localhost:3001/products/${productId}`) // NestJS API 엔드포인트
    .then((response) => response.data);

  return {
    type: GET_PRODUCT_DETAIL,
    payload: request,
  };
};

```

productlist/[catagory].tsx

```tsx
const ProductList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // pathname을 사용하여 카테고리 추출
  const currentPath = pathname.split("/")[2];
  // '/productlist/[category]' 에서 카테고리 부분만 추출
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const selectedCategory = currentPath || "All";
        const action = getProductsByCategory(selectedCategory);
        const response = await dispatch(action);
        if (response.payload) {
          setProducts(await response.payload);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [currentPath, dispatch]);

  const handleProductClick = (productId: string) => {
    router.push(`/productdetail/${productId}`);
  };Ï
```
<hr/>

# Operation screen 

#### 1.Main page & Sign in



https://github.com/user-attachments/assets/829c2c1c-a65a-497d-8e15-922eae72512b


You can proceed to the next stage only when you agree to all the terms and conditions, and if you try to sign up by filling in all the fields
<img width="869" alt="회원가입후 DB" src="https://github.com/user-attachments/assets/ed55af06-9d1a-4e95-9a97-54cde7bfc61b">
On the nestjs server, use bcrypt to encrypt the password and store it in the DB.

member.service.ts

```tsx
async transformPassword(createMemberDto: CreateMemberDto): Promise<void> {
    //bcrypt and protect password
    createMemberDto.password = await bcrypt.hash(
      createMemberDto.password,
      saltRounds,
    );
    console.log(`Transformed password: ${createMemberDto.password}`); // 변환된 비밀번호 출력
    return Promise.resolve();
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    await this.transformPassword(createMemberDto);
    const createdMember = new this.memberModel(createMemberDto);
    return createdMember.save();
  }
```
#### 2. Login(admin User,normal User)



https://github.com/user-attachments/assets/e1bb202d-2184-46bb-aa7a-59dc181188bb

When you log in, the top bar menu changes and my page changes depending on whether it is admin or normal


#### 3. Shop&Cart


https://github.com/user-attachments/assets/fa633ee0-28f7-4ac7-ab65-c364948757b1

You can view products by category and add and delete them to your shopping cart.


#### 4. Add Product


https://github.com/user-attachments/assets/7619e212-314f-40cb-9ba0-7434bb69a623

It is possible to add products when connected by admin user, and the photo is stored in firebase storage, and the rest of the information, including the url of the photo stored in firebase, is stored in mongoDB

-products
<br>
<img width="876" alt="스크린샷 2024-10-23 오후 6 06 06" src="https://github.com/user-attachments/assets/0660f859-b62f-415f-b858-3f26658a81e1">

-productdetails
<br>
<img width="858" alt="스크린샷 2024-10-23 오후 6 06 32" src="https://github.com/user-attachments/assets/40022ebe-ae61-443d-b3c9-948ac538e924">



#### 5. About & Archive & Contact

-About


https://github.com/user-attachments/assets/c7282896-b061-4fe7-bd57-52fc8a924803


-Archive


https://github.com/user-attachments/assets/2213a290-910f-450b-a329-43da19d2b28b


-Contact



https://github.com/user-attachments/assets/75aa1dfc-a1a1-405d-a82e-5901a98565d9



<hr/>

## How to run server

    git clone` git@github.com:LEEJUNGHOOON/movieCloneCoding.git

    npm i

    cd server

    npm run dev

<hr/>

Deployed Server: url
<hr/>

## refernece
 >> https://typo.tistory.com/entry/Nest-Next-n2server-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0
