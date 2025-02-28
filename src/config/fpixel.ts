export const startUpPageView = () => {
	fbq('track', 'Startup-Page-View');
};

export const b2bPageView = () => {
	fbq('track', 'B2B-Page-View');
};

export const aboutPageView = () => {
	fbq('track', 'About-Page-View');
};

export const startUpCatalogueForm = () => {
	fbq('track', 'Startup-Catalogue-Form');
};

export const b2bCatalogueForm = () => {
	fbq('track', 'B2B-Catalogue-Form');
};

export const b2bBrochureForm = () => {
	fbq('track', 'B2B-Brochure-Form');
};

export const customBtnClick = (location: string, title: string) => {
	fbq('track', `${title}-${location}`, {
		location: location,
		title: title,
	});
};

export const whatsappEnquiry = () => {
	fbq('track', 'Whatsapp-Enquiry-Btn');
};
export const phoneEnquiry = () => {
	fbq('track', 'Phone-Enquiry-Btn');
};