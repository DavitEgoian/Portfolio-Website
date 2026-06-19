const LOGO_BASE = `${process.env.PUBLIC_URL}/org-logos`;

export const ORGANIZATION_LOGOS = {
  "Georgian National University": `${LOGO_BASE}/seu.png`,
  "Georgian National University SEU": `${LOGO_BASE}/seu.png`,
  "BTU • Business and Technology University": `${LOGO_BASE}/btu.png`,
  "Business and Technology University": `${LOGO_BASE}/btu.png`,
  "TBC Bank": `${LOGO_BASE}/tbc-bank.png`,
  "IT Academy Step Georgia": `${LOGO_BASE}/it-step.png`,
  "Georgian AI Association": `${LOGO_BASE}/georgian-ai.png`,
  UniLab: `${LOGO_BASE}/unilab.png`,
  "Bank of Georgia": `${LOGO_BASE}/bank-of-georgia.png`,
  DataCamp: `${LOGO_BASE}/datacamp.png`,
  GitHub: `${LOGO_BASE}/github.png`,
  Udemy: `${LOGO_BASE}/udemy.png`,
  Amazon: `${LOGO_BASE}/aws.png`,
  Certiport: `${LOGO_BASE}/certiport.png`,
};

export function getOrganizationLogo(organization) {
  if (!organization) return null;
  return ORGANIZATION_LOGOS[organization] || null;
}
