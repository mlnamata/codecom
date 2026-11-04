/** HTML vzniká z vlastních textů v obsah/prezentace (src/lib/obsah.ts), ne ze vstupu návštěvníka. */
export function Markdown({ html, className = 'prosa' }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
