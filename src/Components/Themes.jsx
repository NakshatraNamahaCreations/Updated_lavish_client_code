import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthAxios } from '../utils/api';

const Themes = () => {
    const [themes, setThemes] = useState([]);
    const [subSubCategory, setSubSubCategory] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { subSubCategoryId } = useParams();
    const navigate = useNavigate();

    console.log("Themes component mounted with subSubCategoryId:", subSubCategoryId);

    // Fetch themes for the sub-subcategory
    const fetchThemes = async () => {
        try {
            console.log("Fetching themes for subSubCategoryId:", subSubCategoryId);
            const res = await getAuthAxios().get(
                `themes/subsubcategory/${subSubCategoryId}`
            );
            console.log("Themes API response:", res.data);
            if (res.data.data && res.data.data.length > 0) {
                setThemes(res.data.data);
                console.log("Themes set:", res.data.data);
            } else {
                console.log("No themes found, redirecting to services");
                // If no themes found, redirect to services
                navigate(`/service/${subSubCategoryId}`);
            }
        } catch (err) {
            console.error("Error fetching themes:", err);
            setError("Failed to load themes");
            // If error occurs, redirect to services
            navigate(`/service/${subSubCategoryId}`);
        } finally {
            setLoading(false);
        }
    };

    // Fetch sub-subcategory details
    const fetchSubSubCategory = async () => {
        try {
            console.log("Fetching sub-subcategory details for:", subSubCategoryId);
            const res = await getAuthAxios().get(
                `subsubcategories/${subSubCategoryId}`
            );
            console.log("Sub-subcategory API response:", res.data);
            if (res.data.data) {
                setSubSubCategory(res.data.data);
            } else {
                setError("Failed to load category details");
            }
        } catch (err) {
            console.error("Error fetching sub-subcategory:", err);
            setError("Failed to load category details");
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchThemes(), fetchSubSubCategory()]);
        };
        loadData();
    }, [subSubCategoryId]);

    const handleThemeClick = (themeId) => {
        console.log("Theme clicked, navigating to service:", themeId);
        // Navigate to services page with the theme ID
        navigate(`/service/${themeId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-primary">Loading...</div>
            </div>
        );
    }

    // Improved: Never show the ID, fallback to a generic label if needed
    const getCategoryName = () => {
        if (
            themes.length > 0 &&
            themes[0].subSubCategory &&
            themes[0].subSubCategory.subSubCategory
        ) {
            return themes[0].subSubCategory.subSubCategory;
        }
        if (subSubCategory && subSubCategory.subSubCategory) {
            return subSubCategory.subSubCategory;
        }
        if (themes.length > 0) {
            return "Themes";
        }
        return "Category";
    };

    return (
        <div className='lg:py-24 md:pt-20 pt-32 p-3 px-20 mx-auto '>
            <h1 className="text-3xl text-primary font-bold my-5">
                {getCategoryName()} Themes
            </h1>
            {error && themes.length === 0 && (
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
            )}
            {themes.length === 0 && !error && (
                <div className="text-center text-gray-600 mb-4">
                    No themes available for this category.
                </div>
            )}
            <div className="grid grid-cols-4 gap-16 mt-10 md:place-items-center">
                {themes.map((theme) => (
                    <div 
                        key={theme._id}
                        onClick={() => handleThemeClick(theme._id)}
                        className=" cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={`http://localhost:5000/images/${theme.image}`}
                            alt={theme.theme}
                            className="rounded-3xl"
                        />
                        <p className="bricolage-grotesque text-black pt-4 md:text-3xl text-xl text-center font-bold ">
                            {theme.theme}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Themes; 