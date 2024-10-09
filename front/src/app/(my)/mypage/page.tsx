"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  admin: boolean;
}

const MyPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      alert("You must be logged in to view this page");
      router.push("/login"); // 로그인 페이지로 리다이렉트
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/member/${userId}`
        );
        setUserData(response.data);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleAddProductClick = () => {
    router.push("/addproduct"); // Add Product 페이지로 이동
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-96 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-black mb-6">
          My Page
        </h1>
        {userData ? (
          <div className="text-black">
            <p className="mb-4">
              <strong>ID:</strong> {userData.id}
            </p>
            <p className="mb-4">
              <strong>Name:</strong> {userData.name}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="mb-4">
              <strong>Phone:</strong> {userData.phone}
            </p>

            {/* 관리자인 경우에만 AddProduct 버튼을 표시 */}
            {userData.admin && (
              <div className="text-center mt-6">
                <button
                  onClick={handleAddProductClick}
                  className=" border border-black bg-white text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition-colors"
                >
                  Add Product
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-black">No user data available</div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
