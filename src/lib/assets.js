/** Asset imports go through the bundler so the single-file build can inline them. */
import portrait from '../assets/img/portrait.jpg'
import portrait640 from '../assets/img/portrait-640.jpg'
import portraitDither from '../assets/img/portrait-dither.png'
import introToAi from '../assets/certs/intro-to-ai.jpg'
import introToAiThumb from '../assets/certs/intro-to-ai-thumb.jpg'
import stayAheadAi from '../assets/certs/stay-ahead-ai.jpg'
import stayAheadAiThumb from '../assets/certs/stay-ahead-ai-thumb.jpg'
import productivityAi from '../assets/certs/productivity-ai.jpg'
import productivityAiThumb from '../assets/certs/productivity-ai-thumb.jpg'
import artOfPrompting from '../assets/certs/art-of-prompting.jpg'
import artOfPromptingThumb from '../assets/certs/art-of-prompting-thumb.jpg'
import promptsLikeAPro from '../assets/certs/prompts-like-a-pro.jpg'
import promptsLikeAProThumb from '../assets/certs/prompts-like-a-pro-thumb.jpg'
import ecommerceStores from '../assets/certs/ecommerce-stores.jpg'
import ecommerceStoresThumb from '../assets/certs/ecommerce-stores-thumb.jpg'
import aiBrainstorming from '../assets/certs/ai-brainstorming.jpg'
import aiBrainstormingThumb from '../assets/certs/ai-brainstorming-thumb.jpg'
import captivateAudience from '../assets/certs/captivate-audience.jpg'
import captivateAudienceThumb from '../assets/certs/captivate-audience-thumb.jpg'
import jiraAutomation from '../assets/certs/jira-automation.jpg'
import jiraAutomationThumb from '../assets/certs/jira-automation-thumb.jpg'
import digitalMarketing from '../assets/certs/digital-marketing.jpg'
import digitalMarketingThumb from '../assets/certs/digital-marketing-thumb.jpg'

export const PORTRAIT = {
  src: portrait,
  // srcset only in the normal build; the single-file build inlines one copy.
  srcSet: __SOLO__ ? undefined : `${portrait640} 640w, ${portrait} 1080w`,
  dither: portraitDither,
  width: 1080,
  height: 1350,
}

export const CERTS = {
  'intro-to-ai': { full: introToAi, thumb: introToAiThumb },
  'stay-ahead-ai': { full: stayAheadAi, thumb: stayAheadAiThumb },
  'productivity-ai': { full: productivityAi, thumb: productivityAiThumb },
  'art-of-prompting': { full: artOfPrompting, thumb: artOfPromptingThumb },
  'prompts-like-a-pro': { full: promptsLikeAPro, thumb: promptsLikeAProThumb },
  'ecommerce-stores': { full: ecommerceStores, thumb: ecommerceStoresThumb },
  'ai-brainstorming': { full: aiBrainstorming, thumb: aiBrainstormingThumb },
  'captivate-audience': { full: captivateAudience, thumb: captivateAudienceThumb },
  'jira-automation': { full: jiraAutomation, thumb: jiraAutomationThumb },
  'digital-marketing': { full: digitalMarketing, thumb: digitalMarketingThumb },
}
