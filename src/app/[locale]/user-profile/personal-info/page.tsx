'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    fullName: 'محمد الشافعي احمد محمد',
    email: 'Janedoe@Gmail.Com',
    phone: '+996345789000',
    nationalId: '2347904789'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving personal info:', formData)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 bg-[#D0D5DD52] p-3 rounded-xl">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <h1 className="text-lg font-semibold text-primary">المعلومات الشخصية</h1>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-start text-gray-700 font-bold">
            الاسم رباعي
          </Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="text-start bg-gray-50 border-gray-200 rounded-lg h-12 px-4"
            dir="rtl"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-start text-gray-700 font-bold">
            البريد الالكتروني
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="text-start bg-gray-50 border-gray-200 rounded-lg h-12 px-4"
            dir="rtl"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-start text-gray-700 font-bold">
            رقم الهاتف
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="text-start bg-gray-50 border-gray-200 rounded-lg h-12 px-4"
            dir="rtl"
          />
        </div>

        {/* National ID */}
        <div className="space-y-2">
          <Label htmlFor="nationalId" className="text-start text-gray-700 font-bold">
            رقم الهوية الوطنية
          </Label>
          <Input
            id="nationalId"
            type="text"
            value={formData.nationalId}
            onChange={(e) => handleInputChange('nationalId', e.target.value)}
            className="text-start bg-gray-50 border-gray-200 rounded-lg h-12 px-4"
            dir="rtl"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 flex justify-end">
          <Button
            onClick={handleSave}
            variant="outline"
            className="w-auto px-8 py-3 border-2 border-secondary text-secondary hover:text-white hover:bg-secondary rounded-full font-bold bg-white"
          >
            حفظ التعديلات
          </Button>
        </div>
      </div>
    </div>
  )
}
