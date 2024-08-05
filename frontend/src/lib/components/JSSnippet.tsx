import { useValues } from 'kea'
import { CodeSnippet, Language } from 'lib/components/CodeSnippet'
import { FEATURE_FLAGS } from 'lib/constants'
import { featureFlagLogic } from 'lib/logic/featureFlagLogic'
import { apiHostOrigin } from 'lib/utils/apiHost'
import { teamLogic } from 'scenes/teamLogic'

export function useJsSnippet(indent = 0): string {
    const { currentTeam } = useValues(teamLogic)
    const { featureFlags } = useValues(featureFlagLogic)
    const isPersonProfilesDisabled = featureFlags[FEATURE_FLAGS.PERSONLESS_EVENTS_NOT_SUPPORTED]

    return [
        '<script>',
        `    !function(t,e){var o,n,p,r;e.__SV||(window.webanalytics=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.webanalytics.com","-assets.i.webanalytics.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="webanalytics",u.people=u.people||[],u.toString=function(t){var e="webanalytics";return"webanalytics"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonProperties".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.webanalytics||[]);`,
        `    webanalytics.init('${currentTeam?.api_token}',{api_host:'${apiHostOrigin()}', ${
            isPersonProfilesDisabled
                ? ``
                : `person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well`
        }
        })`,
        '</script>',
    ]
        .map((x) => ' '.repeat(indent) + x)
        .join('\n')
}

export function JSSnippet(): JSX.Element {
    const snippet = useJsSnippet()

    return <CodeSnippet language={Language.HTML}>{snippet}</CodeSnippet>
}
