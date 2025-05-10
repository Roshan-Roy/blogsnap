import React from 'react'

const ProfileSuspense = () => {
    return (
        <div className="flex w-5/12 mx-auto justify-center gap-12 mt-10">
            <div className="relative w-56 h-56 rounded-full overflow-hidden bg-gray-200"></div>
            <div className="flex-1 flex flex-col gap-5 text-lg">
                <div className="flex justify-between">
                    <div className="bg-gray-200 h-9 w-[200px] rounded-lg"></div>
                    <div className="bg-gray-200 h-8 w-[128px] rounded-lg"></div>
                </div>
                <div className="h-5 w-[150px] rounded-lg bg-gray-200"></div>
                <div className="flex justify-between gap-6">
                    <div className="h-8 bg-gray-200 flex-1 rounded-lg"></div>
                    <div className="h-8 bg-gray-200 flex-1 rounded-lg"></div>
                    <div className="h-8 bg-gray-200 flex-1 rounded-lg"></div>
                </div>
                <div className="w-[250px] h-8 rounded-lg bg-gray-200"></div>
                <div className="flex gap-5 mt-2">
                    <div className="h-[23px] w-[23px] rounded-lg bg-gray-200"></div>
                    <div className="h-[23px] w-[23px] rounded-lg bg-gray-200"></div>
                    <div className="h-[23px] w-[23px] rounded-lg bg-gray-200"></div>
                    <div className="h-[23px] w-[23px] rounded-lg bg-gray-200"></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSuspense