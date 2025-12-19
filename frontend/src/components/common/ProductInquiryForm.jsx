import { X, ShoppingCart, User, Mail, Phone, Building } from "lucide-react";
import API from '../../services/api';

const ProductInquiryForm = ({
  showProductForm,
  setShowProductForm,
  currentProduct,
  productFormData,
  setProductFormData,
  handleProductFormSubmit: propHandleSubmit, // rename to avoid conflict
}) => {
  // Local submit handler jo API call karta hai aur phir parent ke handler ko call karta hai (optional)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call
      const response = await API.submitProductInquiry(productFormData);
      console.log('Product inquiry submitted:', response);

      // Success feedback
      alert('Product inquiry submitted successfully! Our team will contact you shortly.');

      // Reset form
      setProductFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        product: currentProduct?.name || '',
        message: ''
      });

      // Close modal
      setShowProductForm(false);

      // Agar parent mein koi extra logic hai (e.g., analytics), toh usko bhi call kar sakte hain
      if (propHandleSubmit) {
        propHandleSubmit(e); // optional: parent ka original handler call karo
      }

    } catch (error) {
      console.error('Error submitting product inquiry:', error);
      alert(error.message || 'Failed to submit product inquiry. Please try again.');
    }
  };

  return (
    showProductForm && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl p-4 max-h-[100vh] overflow-y-auto">
          <button
            onClick={() => setShowProductForm(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Request {currentProduct?.name}
            </h3>
            <p className="text-gray-600 mb-3">
              Fill in your details and our team will contact you shortly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Baaki form fields same as before */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={productFormData.email}
                    onChange={(e) => setProductFormData({ ...productFormData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="tel"
                    required
                    value={productFormData.phone}
                    onChange={(e) => setProductFormData({ ...productFormData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  value={productFormData.company}
                  onChange={(e) => setProductFormData({ ...productFormData, company: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Interested In *
              </label>
              <input
                type="text"
                readOnly
                value={productFormData.product}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message
              </label>
              <textarea
                value={productFormData.message}
                onChange={(e) => setProductFormData({ ...productFormData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
                placeholder="Tell us about your requirements..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
            >
              Submit Request
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            By submitting, you agree to our Privacy Policy
          </p>
        </div>
      </div>
    )
  );
};

export default ProductInquiryForm;